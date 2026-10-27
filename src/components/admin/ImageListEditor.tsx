"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Trash2, Upload } from "lucide-react";
import type { EditorItem, LibraryItem } from "@/lib/admin/content-types";

interface ImageListEditorProps {
  items: EditorItem[];
  onChange: (items: EditorItem[]) => void;
  library: LibraryItem[];
  /** Gallery only: lets each photo be filed under a category. */
  categories?: readonly string[];
  /** Folder new uploads are filed under. */
  uploadFolder: string;
}

const btn =
  "inline-flex min-h-9 items-center gap-1.5 rounded-[6px] border border-line bg-card px-2.5 text-small hover:border-burgundy disabled:opacity-40";

export function ImageListEditor({
  items,
  onChange,
  library,
  categories,
  uploadFolder,
}: ImageListEditorProps) {
  const [picker, setPicker] = useState(false);
  const [query, setQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const used = useMemo(() => new Set(items.map((item) => item.src)), [items]);

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target]!, next[index]!];
    onChange(next);
  };
  const patch = (index: number, change: Partial<EditorItem>) =>
    onChange(items.map((item, i) => (i === index ? { ...item, ...change } : item)));
  const add = (photo: LibraryItem) =>
    onChange([
      ...items,
      {
        src: photo.url,
        alt: photo.alt,
        ...(categories ? { category: categories.includes("Rooms") ? "Rooms" : categories[0] } : {}),
      },
    ]);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setMessage("");
    const body = new FormData();
    Array.from(files).forEach((file) => body.append("files", file));
    body.set("folder", uploadFolder);
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body });
      const result = (await response.json()) as {
        saved?: LibraryItem[];
        failed?: string[];
        error?: string;
      };
      if (!response.ok && !result.saved?.length) throw new Error(result.error ?? "Upload failed.");
      const saved = result.saved ?? [];
      onChange([
        ...items,
        ...saved.map((photo) => ({
          src: photo.url,
          alt: "",
          ...(categories ? { category: categories[0] } : {}),
        })),
      ]);
      setMessage(
        `${saved.length} photo${saved.length === 1 ? "" : "s"} uploaded and added.` +
          (result.failed?.length ? ` Could not upload: ${result.failed.join(", ")}.` : "") +
          " Add a description for each, then save.",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  const q = query.trim().toLowerCase();
  const results = library
    .filter((photo) => photo.mime.startsWith("image/"))
    .filter((photo) => !q || `${photo.folder} ${photo.alt} ${photo.url}`.toLowerCase().includes(q))
    .slice(0, 60);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={btn} onClick={() => fileInput.current?.click()} disabled={uploading}>
          <Upload size={15} aria-hidden="true" /> {uploading ? "Uploading..." : "Upload photos"}
        </button>
        <button type="button" className={btn} onClick={() => setPicker((open) => !open)}>
          <ImagePlus size={15} aria-hidden="true" /> {picker ? "Close library" : "Add from library"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => void upload(event.target.files)}
        />
        <span role="status" className="text-small">
          {message}
        </span>
      </div>

      {picker ? (
        <div className="rounded-[10px] border border-line bg-surface p-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by folder or description"
            aria-label="Search the media library"
            className="mb-3 min-h-10 w-full rounded-[6px] border border-line bg-card px-3 text-small"
          />
          <ul className="grid max-h-80 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4 lg:grid-cols-6">
            {results.map((photo) => (
              <li key={photo.id}>
                <button
                  type="button"
                  onClick={() => add(photo)}
                  disabled={used.has(photo.url)}
                  className="group relative block w-full overflow-hidden rounded-[6px] border border-line disabled:opacity-40"
                  title={photo.folder}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.alt || photo.folder}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-burgundy/80 px-1 py-0.5 text-[0.7rem] text-ivory">
                    {used.has(photo.url) ? "Already added" : photo.folder.replace(/^images\//, "")}
                  </span>
                </button>
              </li>
            ))}
            {results.length === 0 ? <li className="col-span-full text-small">No photos match.</li> : null}
          </ul>
        </div>
      ) : null}

      <ol className="space-y-3">
        {items.map((item, index) => (
          <li
            key={`${item.src}-${index}`}
            className="grid gap-3 rounded-[10px] border border-line bg-card p-3 sm:grid-cols-[8rem_1fr_auto]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt || "Preview"}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[6px] object-cover sm:w-32"
            />
            <div className="min-w-0 space-y-2">
              <label className="block text-small">
                Description (alt text){index === 0 ? " · cover photo" : ""}
                <input
                  value={item.alt}
                  maxLength={300}
                  onChange={(event) => patch(index, { alt: event.target.value })}
                  className="mt-1 block min-h-10 w-full rounded-[6px] border border-line bg-surface px-3 text-small"
                />
              </label>
              {categories ? (
                <label className="block text-small">
                  Category
                  <select
                    value={item.category ?? categories[0]}
                    onChange={(event) => patch(index, { category: event.target.value })}
                    className="mt-1 block min-h-10 w-full rounded-[6px] border border-line bg-surface px-3 text-small sm:w-56"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>
            <div className="flex gap-1.5 sm:flex-col">
              <button type="button" className={btn} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up">
                <ArrowUp size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={btn}
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
              >
                <ArrowDown size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={btn}
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                aria-label="Remove photo"
              >
                <Trash2 size={15} aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ol>
      {items.length === 0 ? <p className="text-small">No photos yet. Upload or add from the library.</p> : null}
    </div>
  );
}
