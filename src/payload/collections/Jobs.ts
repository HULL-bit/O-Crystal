import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { contentCollection, inboxCollection } from "../shared";
import { slugField } from "../fields/slug";

export const Jobs: CollectionConfig = contentCollection({
  slug: "jobs",
  labels: { singular: "Offre d'emploi", plural: "Carrières" },
  admin: {
    group: "Carrières",
    useAsTitle: "title",
    defaultColumns: ["title", "department", "contractType", "_status"],
  },
  revalidate: { tag: "jobs", paths: ["/carrieres"] },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    slugField("title"),
    {
      type: "row",
      fields: [
        { name: "department", type: "text", admin: { width: "50%" } },
        { name: "location", type: "text", defaultValue: "Rufisque", admin: { width: "50%" } },
      ],
    },
    {
      name: "contractType",
      type: "select",
      options: ["CDI", "CDD", "Stage", "Alternance", "Intérim"],
    },
    { name: "summary", type: "textarea", localized: true },
    { name: "description", type: "richText", editor: lexicalEditor(), localized: true },
  ],
});

export const Applications: CollectionConfig = inboxCollection({
  slug: "applications",
  labels: { singular: "Candidature", plural: "Candidatures" },
  admin: {
    group: "Carrières",
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "job", "status", "createdAt"],
  },
  upload: false,
  fields: [
    { name: "fullName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    {
      name: "job",
      type: "relationship",
      relationTo: "jobs",
      admin: { description: "Vide = candidature spontanée." },
    },
    { name: "cv", type: "upload", relationTo: "media", required: true },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "Nouvelle", value: "new" },
        { label: "En cours", value: "reviewing" },
        { label: "Entretien", value: "interview" },
        { label: "Refusée", value: "rejected" },
        { label: "Retenue", value: "hired" },
      ],
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
});
