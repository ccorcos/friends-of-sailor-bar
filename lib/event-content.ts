export type EventPageContent = {
  title: string;
  body: string;
  sources: string[];
  relatedLinks?: { label: string; href: string }[];
  organizer?: string;
  address?: string;
  mapHref?: string;
  editorialNote?: string;
};

export const eventSeriesIntroduction = `*Fun & Educational Activities Every Third Saturday, 9:30–noon at Sailor Bar.*

The Friends of Sailor Bar, in partnership with Sacramento County Regional Parks, present a series of fun and engaging educational events specifically focused on the wildlife, characteristics and history of Sailor Bar.

Enter Sailor Bar from the Illinois Avenue entrance. Drive to the last parking area near the end of the road, just before the boat launch area. Events begin underneath the shade of a large oak tree.`;

export const eventPageContent: Record<string, EventPageContent> = {
  "friends-of-sailor-bar-rock-off": {
    title: "Friends of Sailor Bar Rock Off",
    sources: ["friends-of-sailor-bar-rock-off-on-october-3rd-2025"],
    body: `In September of 2019, a 1,400-foot side channel was carved into the north bank of the American River immediately below the Nimbus Dam by Water Forum, U.S. Bureau of Reclamation, and U.S. Fish and Wildlife Service, in cooperation with California Dept of Fish and Wildlife and SAFCA. The channel was designed to provide much needed cover for young Salmon as well as some spawning areas.

In 2025, Friends of Sailor Bar discovered that unknown visitors had piled large numbers of rocks within the channel, creating physical barriers to the flow of water and hindering or preventing fish from swimming through, and rendering the channel nearly unusable by juvenile salmon.

Working together with Sacramento County Parks, the Water Forum, and the California Department of Fish and Wildlife, Friends of Sailor Bar, together with volunteers from several organizations dedicated to preserving and protecting the river, undertook the removal of the rock barriers.

On October 3rd, 2025, some 2 dozen volunteers worked together joyously, hand to hand, dispersing the rocks and eventually restoring the flow of the channel. This cooperative undertaking demonstrates how the broader community can work together to accomplish important restoration.`,
    relatedLinks: [{ label: "Watch the Rock Off video", href: "https://www.youtube.com/watch?v=GrdJAOh8QwQ" }],
  },
  "bench-and-table-dedication": {
    title: "Sailor Bar Bench and Table Dedication",
    sources: ["sailor-bar-bench-and-table-dedication-ceremony", "sailor-bar-bench-dedication"],
    body: `Located along the scenic American River Parkway and operated by Sacramento County Regional Parks, Sailor Bar offers miles of trails winding through oak woodlands, meadows, and river bluffs. It remains a favorite destination for hikers, wildlife watchers, and families seeking a peaceful escape into both nature and history.

The Friends of Sailor Bar (FOSB) works in close partnership with Sacramento Regional Parks to preserve and enhance the park’s natural beauty, wildlife habitat, and historical resources.

To enhance visitor experience and accessibility, FOSB recently acquired seventeen new benches and tables which have been installed throughout the park. We have also launched monthly interpretive programs designed to educate and inspire park visitors.

These benches and tables were dedicated on March 18th, 2026 in a ceremony that took place at the beautiful overlook site at the Olive Avenue entrance to Sailor Bar.

We celebrated the dedication of 12 new benches and 7 tables!`,
    relatedLinks: [{ label: "Watch the dedication ceremony", href: "https://www.youtube.com/watch?v=q45O4qZyGTQ" }],
    editorialNote: "The legacy event calendar lists March 21 and gives the oak gathering area near the boat launch as the general meeting place, while the full dedication page records March 18 at the Olive Avenue overlook. The legacy pages also describe the installation both as seventeen benches and tables and as twelve benches plus seven tables.",
  },
  "earth-day-at-sailor-bar-2026": {
    title: "Earth Day at Sailor Bar: Walk on the Wildlife Side",
    sources: ["earth-day-april-2026"],
    body: `We celebrated Earth Day on Saturday April 18 at Sailor Bar with hands on nature crafts, visit from an Opposum, ….. (and more).`,
  },
  "interactive-birding-2026": {
    title: "Interactive Birding at Sailor Bar",
    sources: ["interactive-birding-at-sailor-bar"],
    body: `Visit here for event photos`,
    editorialNote: "No event photos were published on the legacy page.",
  },
  "family-health-and-wellness-day-2026": {
    title: "Family Health & Wellness Day",
    sources: ["health-wellness-day"],
    body: `photos and description of Health & Wellness day here`,
    editorialNote: "The legacy event calendar called this “Family Health & Fitness Day.” No photos or further description were published on the event page.",
  },
  "american-river-parkway-heroes-2026": {
    title: "Celebrate American River Parkway Heroes",
    sources: ["celebrating-american-river-parkway-heroes"],
    body: `On Saturday morning, July 18th, the Friends of Sailor Bar got together to show our appreciation for the American River Parkway Heroes who keep the ONLY State and Federally designated Wild and Scenic River running through an urban environment safe, clean and wild and scenic!

We celebrated the recent milestone of the River City Waterway Alliance’s removal of over 4 million lbs of trash!

We learned about how the ARP Bike Patrol and the ARP Equestrian Patrol keep the parkway safe.

We honored other parkway heroes including SARA (Save the American River Association), the Friends of Lakes Folsom and Natoma (FOLFAN), the new Sacramento Bird Alliance (formerly Sacramento Audubon Society) President Cliff Fieldheim, Sacramento Water Forum Program Manager, Erica Bishop, Sacramento County Regional Parks Director Liz Bellas, American River Trees grassroots leader Pete Spaulding, and other unsung heroes (including Peaches the horse) of the American River Parkway.`,
    relatedLinks: [{ label: "Watch Heroes of the American River", href: "https://www.youtube.com/watch?v=JtPuMxViJvc" }],
  },
  "wild-and-scenic-american-river-2026": {
    title: "The Wild and Scenic American River",
    sources: ["the-wild-and-scenic-american-river"],
    body: "",
  },
  "real-wildlife-encounters": {
    title: "Sailor Bar Has Gone to the Birds!",
    sources: ["bald-eagles-and-birdhouses", "real-wildlife-encounters"],
    body: `This event was also listed in the legacy event calendar as **Real Wildlife Encounters**.`,
    organizer: "Friends of Sailor Bar",
    address: "4253 Illinois Avenue, Fair Oaks, CA, United States",
    mapHref: "https://www.google.com/maps/search/?api=1&query=4253%20Illinois%20Avenue%2C%20Fair%20Oaks%2C%20CA%2C%20United%20States",
  },
  "ghost-of-sailor-bar": {
    title: "The Ghost of Sailor Bar: How Sailor Bar Got its Name, Legends and Historical Facts",
    sources: ["the-ghost-of-sailor-bar-how-sailor-bar-got-its-name-legends-and-historical-facts"],
    body: "",
    relatedLinks: [{ label: "Read The Ghost of Sailor Bar", href: "/files/Ghost-of-Sailor-Bar.pdf" }],
  },
  "salmon-spawning-journey": {
    title: "Something Fishy is Going on Here! The Remarkable Spawning Journey",
    sources: ["something-fishy-is-going-on-here-the-remarkable-spawning-journey"],
    body: "",
  },
  "new-year-river-cleanup": {
    title: "New Year River Clean-up",
    sources: [],
    body: `Start the year outside with neighbors caring for trails, shoreline, and wildlife habitat.`,
  },
};

export function getEventPageContent(slug: string) {
  return eventPageContent[slug];
}
