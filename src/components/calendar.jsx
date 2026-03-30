"use client";

import * as React from "react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import { ChevronRight, ChevronLeft, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// ================== DATE HELPERS ==================
// Extracts YYYY-MM-DD in UTC from a Date object safely
export function dateToUTCDateOnly(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isoToUTCDateOnly(iso) {
  return dateToUTCDateOnly(new Date(iso));
}

// ================== COMPONENT ==================
export function OrderStockCalendar({
  data = [],
  loading = false,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [month, setMonth] = React.useState(new Date());

  const days = React.useMemo(() => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [month]);

  const monthLabel = React.useMemo(() => format(month, "MMMM yyyy"), [month]);

  const [open, setOpen] = React.useState(false);
  const [editor, setEditor] = React.useState(null);
  const [maxStock, setMaxStock] = React.useState(1);

  const items = data?.data ?? [];

  const byDate = React.useMemo(() => {
    const map = new Map();
    for (const it of items) {
      map.set(isoToUTCDateOnly(it.event_date), it);
    }
    return map;
  }, [items]);

  function openForDate(day) {
    // Convert local day to a midnight UTC date safely
    const utc = new Date(
      Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()),
    );
    const key = dateToUTCDateOnly(utc);
    const existing = byDate.get(key);

    if (existing) {
      setEditor({ mode: "edit", item: existing });
      setMaxStock(existing.max_stock);
    } else {
      setEditor({ mode: "create", date: day });
      setMaxStock(1);
    }

    setOpen(true);
  }

  function handleSave() {
    if (!editor) return;

    const parsed = Number(maxStock);
    if (isNaN(parsed)) return;

    if (editor.mode === "create") {
      const utc = new Date(
        Date.UTC(
          editor.date.getFullYear(),
          editor.date.getMonth(),
          editor.date.getDate(),
        ),
      );

      onCreate?.({
        event_date: utc.toISOString(),
        max_stock: parsed,
      });
    } else {
      onUpdate?.({
        id: editor.item.id,
        payload: {
          max_stock: parsed,
          event_date: editor.item.event_date,
        },
      });
    }

    setOpen(false);
  }

  function handleDelete() {
    if (!editor || editor.mode !== "edit") return;
    onDelete?.({ id: editor.item.id });
    setOpen(false);
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2 pb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMonth((m) => addMonths(m, -1))}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMonth((m) => addMonths(m, 1))}
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">{monthLabel}</div>
          <div className="text-xs text-muted-foreground">
            {loading ? "Loading…" : `${items.length} days configured`}
          </div>
        </div>

        <Button size="sm" onClick={() => openForDate(new Date())}>
          <PlusIcon className="h-4 w-4" /> Set day stock
        </Button>
      </div>

      {/* Days of the week header */}
      <div className="grid grid-cols-7 text-xs text-muted-foreground">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="px-2 py-2 text-center">
            {d}
          </div>
        ))}
      </div>

      {/* 2. Simplified to a single flat grid instead of mapping weeks -> days */}
      <div className="grid grid-cols-7 auto-rows-fr">
        {days.map((day, index) => {
          const isCurrent = isSameMonth(day, month);

          const utc = new Date(
            Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()),
          );
          const key = dateToUTCDateOnly(utc);
          const it = byDate.get(key);

          // Calculate borders efficiently in a 1D flat map
          const isTopRow = index < 7;
          const isLeftCol = index % 7 === 0;

          return (
            <button
              key={key}
              type="button"
              onClick={() => openForDate(day)}
              disabled={loading}
              className={[
                "min-h-[110px] border-b border-r p-2 text-left transition-colors",
                isTopRow ? "border-t" : "",
                isLeftCol ? "border-l" : "",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:z-10",
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/30",
                !isCurrent ? "bg-muted/10" : "bg-background",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-1 sm:gap-2">
                <div
                  className={`text-xs font-medium ${!isCurrent ? "text-muted-foreground" : ""}`}
                >
                  {format(day, "d")}
                </div>

                {it && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                  >
                    {it.current_stock}/{it.max_stock}
                  </Badge>
                )}
              </div>

              <div className="mt-2 space-y-1">
                {it ? (
                  <div className="truncate rounded-md bg-primary/10 px-2 py-1 text-xs">
                    Max: {it.max_stock}{" "}
                    <span className="text-muted-foreground hidden sm:inline">
                      (current {it.current_stock})
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground opacity-0 hover:opacity-100 transition-opacity">
                    + Set stock
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Editor Modal */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            // Slight delay so the UI doesn't visually reset before animating out
            setTimeout(() => setEditor(null), 200);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editor?.mode === "edit" ? "Edit day stock" : "Create day stock"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Date:{" "}
              <span className="font-medium text-foreground">
                {editor?.mode === "edit"
                  ? isoToUTCDateOnly(editor.item.event_date)
                  : editor?.mode === "create"
                    ? format(editor.date, "yyyy-MM-dd") // Local date format fallback
                    : "-"}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium">Max stock</div>
              <Input
                type="number"
                min={0}
                value={maxStock}
                onChange={(e) => setMaxStock(Number(e.target.value))}
              />

              {editor?.mode === "edit" && (
                <div className="text-xs text-muted-foreground">
                  Current stock (readonly): {editor.item.current_stock}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <div className="flex w-full items-center justify-between gap-2">
              <div>
                {editor?.mode === "edit" && (
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editor?.mode === "edit" ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}