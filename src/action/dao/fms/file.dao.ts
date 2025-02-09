import {prisma} from "@/libs/prisma";
import {FileKind} from "@prisma/client";

export const findByFileKindAndResourceIdIn = async (fileKind: FileKind, resourceIds: number[]) => {
  return prisma.fmsFile.findMany({
    where: {
      AND: [
        {fileKind: fileKind},
        {
          resourceId: {
            in: [...resourceIds]
          }
        }
      ]
    }
  });
}
