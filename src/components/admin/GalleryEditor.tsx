"use client";

import { useState, useTransition } from "react";
import { resetGalleryContent, saveGalleryContent } from "@/lib/admin/content-actions";
import { GALLERY_CATEGORIES, type EditorItem, type LibraryItem } from "@/lib/admin/content-types";
import { ImageListEditor } from "./ImageListEditor";

interface GalleryEditorProps {
  initialItems: EditorItem[];
  customised: boolean;
  library: LibraryItem[];
}

export function GalleryEditor({ initialItems, customised, library }: GalleryEditorProps) {
  const [items, setItems] = useState(initialItems);
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();

  const save = () =>
    startTransition(async () => {
      setStatus("");
      const result = await saveGalleryContent(items);
      setStatus(result.ok ? "Saved. The gallery shows it from the next visit." : (result.error ?? ""));
    });
  const reset = () => {
    if (!window.confirm("Remove your changes and go back to the original gallery?")) return;
    startTransition(async () => {
      const result = await resetGalleryContent();
      setStatus(result.ok ? "Reset. Reload to see the original gallery." : (result.error ?? ""));
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-small">{items.length} photos in the gallery.</p>
      <ImageListEditor
        items={items}
        onChange={setItems}
        library={library}
        categories={GALLERY_CATEGORIES}
        uploadFolder="uploads/gallery"
      />
      <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center gap-3 border-t border-line bg-surface/95 px-1 py-3 backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="min-h-11 rounded-[6px] bg-burgundy px-5 text-small text-ivory disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save gallery"}
        </button>
        {customised ? (
          <button type="button" onClick={reset} disabled={pending} className="min-h-11 rounded-[6px] border border-line px-4 text-small">
            Reset to original
          </button>
        ) : null}
        <p role="status" className="text-small">
          {status}
        </p>
      </div>
    </div>
  );
}
