"use server";

import { db } from "@/lib/db";

export async function CreateRef(refVal) {
  try {
    await db.Ref.create({
      data: {
        id: refVal,
      },
    });
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function GetRef(refVal) {
  if (!refVal) return { message: "refVal is absent" };

  try {
    const ref = await db.Ref.findUnique({
      where: {
        id: refVal,
      },
    });
    return { data: ref };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function UpdateRef(refVal) {
  if (!refVal) return { message: "refVal is absent" };

  try {
    const ref = await db.Ref.findUnique({
      where: {
        id: refVal,
      },
    });

    if (ref) {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      const hasRecentVisit =
        ref?.visited &&
        ref.visited.length > 0 &&
        new Date(ref.visited[ref.visited.length - 1]) > fifteenMinutesAgo;

      if (!hasRecentVisit) {
        await db.Ref.update({
          where: {
            id: refVal,
          },
          data: {
            visited: {
              push: new Date(),
            },
          },
        });
        return { message: "success" };
      }

      return { message: "recently updated" };
    }
    return { message: "record not found" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}
