import { Prisma } from "@prisma/client/extension";
import {
  configureKeys,
  encryptOnWrite,
  decryptOnRead,
} from "prisma-field-encryption/dist/encryption.js";
import { analyseDMMF } from "prisma-field-encryption/dist/dmmf.js";

// Prisma v7's `prisma-client` generator no longer embeds the `///` field
// annotations in the generated client, so prisma-field-encryption can't discover
// the encrypted fields on its own (it used to read `Prisma.dmmf`). This datamodel
// mirrors the `@encrypted` / `@encryption:hash` annotations in
// prisma/schema.prisma and must be kept in sync with it if those change.
const encryptionDataModel = {
  datamodel: {
    models: [
      {
        name: "User",
        fields: [
          {
            name: "email",
            isList: false,
            isUnique: true,
            isId: true,
            type: "String",
          },
          {
            name: "portfolios",
            isList: true,
            isUnique: false,
            isId: false,
            type: "Portfolio",
          },
          {
            name: "supports",
            isList: true,
            isUnique: false,
            isId: false,
            type: "Support",
          },
          {
            name: "feedbacks",
            isList: true,
            isUnique: false,
            isId: false,
            type: "Feedback",
          },
        ],
      },
      {
        name: "Portfolio",
        fields: [
          {
            name: "id",
            isList: false,
            isUnique: false,
            isId: true,
            type: "String",
          },
          {
            name: "portfolioName",
            isList: false,
            isUnique: true,
            isId: false,
            type: "String",
            documentation: "@encrypted",
          },
          {
            name: "portfolioNameHash",
            isList: false,
            isUnique: true,
            isId: false,
            type: "String",
            documentation: "@encryption:hash(portfolioName)",
          },
          {
            name: "transactions",
            isList: true,
            isUnique: false,
            isId: false,
            type: "Transaction",
          },
          {
            name: "owner",
            isList: false,
            isUnique: false,
            isId: false,
            type: "User",
          },
        ],
      },
      {
        name: "Transaction",
        fields: [
          {
            name: "id",
            isList: false,
            isUnique: false,
            isId: true,
            type: "String",
          },
          {
            name: "transactionName",
            isList: false,
            isUnique: false,
            isId: false,
            type: "String",
            documentation: "@encrypted",
          },
          {
            name: "comments",
            isList: false,
            isUnique: false,
            isId: false,
            type: "String",
            documentation: "@encrypted",
          },
          {
            name: "portfolio",
            isList: false,
            isUnique: false,
            isId: false,
            type: "Portfolio",
          },
        ],
      },
      {
        name: "Support",
        fields: [
          {
            name: "id",
            isList: false,
            isUnique: false,
            isId: true,
            type: "String",
          },
          {
            name: "owner",
            isList: false,
            isUnique: false,
            isId: false,
            type: "User",
          },
        ],
      },
      {
        name: "Feedback",
        fields: [
          {
            name: "id",
            isList: false,
            isUnique: false,
            isId: true,
            type: "String",
          },
          {
            name: "owner",
            isList: false,
            isUnique: false,
            isId: false,
            type: "User",
          },
        ],
      },
    ],
  },
};

export function getFieldEncryptionExtension() {
  const keys = configureKeys({});
  const models = analyseDMMF(encryptionDataModel);

  return Prisma.defineExtension({
    name: "prisma-field-encryption",
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (!model) {
            return query(args);
          }
          const params = {
            args,
            model,
            action: operation,
            dataPath: [],
            runInTransaction: false,
          };
          const encryptedParams = encryptOnWrite(
            params,
            keys,
            models,
            operation,
          );
          const result = await query(encryptedParams.args);
          decryptOnRead(encryptedParams, result, keys, models, operation);
          return result;
        },
      },
    },
  });
}
