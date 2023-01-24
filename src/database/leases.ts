import { leases, Leases, LeasesView } from "./models";
import { DatabaseService } from "./impl";
import { sql } from "@databases/mysql";

async function updateLease(id: string, updateValues: Partial<Leases>) {
  const db = DatabaseService.getDb();
  return await leases(db).update({ id }, updateValues);
}

async function findLeaseByStripeSubscriptionId(stripeSubscriptionId: string) {
  const db = DatabaseService.getDb();
  return await leases(db).findOne({ stripeSubscriptionId });
}

async function listCohabLeases() {
  const db = DatabaseService.getDb();
  const result = (await db.query(
    sql`
    SELECT
      id,
      startDate ,
      endDate ,
      rentAmount ,
      name ,
      status,
      stripeSubscriptionId,
      hr.houseId,
      hr.houseName,
      hr.roomId,
      hr.stripeProductId,
      us.stripeCustomerId,
      us.lastName,
      us.firstName
    FROM
      leases l
    LEFT JOIN (
      SELECT
        u.id as userId ,
        u.lastName,
        u.firstName,
        u.stripeCustomerId
      FROM
        users u 
    ) us 
    ON
      us.userId = l.userId
    LEFT JOIN 
    (
      SELECT
        h.id as houseId,
        h.name as houseName,
        r.id as roomId,
        r.stripeProductId ,
        r.rent
      FROM
        rooms r
      LEFT JOIN houses h 
      ON
        h.id = r.houseId
    )
    hr 
    ON
      l.roomId = hr.roomId
    WHERE l.status = 'active';
`
  )) as Array<LeasesView>;
  return result;
}

export { findLeaseByStripeSubscriptionId, listCohabLeases, updateLease };
