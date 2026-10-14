export interface Offer {
  id: string;
  title: string;
  description: string;
  /** ISO dates (yyyy-mm-dd). Leave out for an offer with no fixed window. */
  validFrom?: string;
  validTo?: string;
  conditions: string;
  /** Only active offers appear in the enquiry form. */
  active: boolean;
}

// TODO: the client must fill in real offers here. Nothing is shown in the form until at least one entry
// has `active: true`, and no discount is ever claimed as applied: the resort confirms every offer.
//
// Examples of the shape (commented out on purpose, they are NOT real offers):
//
// {
//   id: "weekday-stay",
//   title: "Weekday stay",
//   description: "A short line describing the offer, written by the resort.",
//   validFrom: "2026-11-01",
//   validTo: "2027-03-31",
//   conditions: "Conditions, as stated by the resort.",
//   active: true,
// },
// {
//   id: "long-stay",
//   title: "Long-stay offer",
//   description: "A short line describing the offer, written by the resort.",
//   conditions: "Conditions, as stated by the resort.",
//   active: true,
// },
export const offers: Offer[] = [];

export const activeOffers = offers.filter((offer) => offer.active);
