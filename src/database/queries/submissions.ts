import { InsertObject } from "kysely";
import { DB, Submissions } from "../database";
import { db } from "../client";

export const dbCreateSubmissions = async (
  submission: InsertObject<DB, "submissions">,
  attachments: Omit<InsertObject<DB, "attachments">, "submission_id">[],
) => {
  try {
    const createdSubmissionId = await db.transaction().execute(async (trx) => {
      const createdSubmission = await trx
        .insertInto("submissions")
        .values(submission)
        .returning("id")
        .executeTakeFirst();
      const createdId = createdSubmission?.id;
      if (!createdId) {
        throw new Error("Failed to create new submission");
      }
      const filledAttachments = attachments.map((attachment) => ({
        url: attachment.url,
        submission_id: createdId,
      }));
      if (filledAttachments.length !== 0) {
        await trx.insertInto("attachments").values(filledAttachments).execute();
      }
      return createdId;
    });
    const createdSubmission = await db
      .selectFrom("submissions")
      .where("submissions.id", "=", createdSubmissionId)
      .leftJoin("attachments", "attachments.submission_id", "submissions.id")
      .selectAll("submissions")
      .select(["attachments.url"])
      .groupBy(["submissions.id", "submissions.content", "attachments.id"])
      .execute();

    if (createdSubmission.length === 0) {
      return undefined;
    }
    const collectedAttachments = createdSubmission.reduce<string[]>(
      (acc, curr) => {
        if (curr.url) {
          acc.push(curr.url);
        }
        return acc;
      },
      [],
    );
    const { url, ...sampleSubmission } = createdSubmission[0];
    return {
      ...sampleSubmission,
      attachments: collectedAttachments,
    };
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export type CreatedSubmissionData = NonNullable<
  Awaited<ReturnType<typeof dbCreateSubmissions>>
>;
