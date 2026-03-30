"use client";

import * as React from "react";
import { format } from "date-fns";

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
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}
function clampToNoon(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
}
export function dateToUTCDateOnly(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isoToUTCDateOnly(iso) {
  const date = new Date(iso);
  return dateToUTCDateOnly(date);
}

function getCalendarGrid(monthDate) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);

  const startDow = start.getDay();
  const gridStart = new Date(start);
  gridStart.setDate(start.getDate() - startDow);

  const endDow = end.getDay();
  const gridEnd = new Date(end);
  gridEnd.setDate(end.getDate() + (6 - endDow));

  const days = [];
  const cursor = new Date(gridStart);

  while (cursor <= gridEnd) {
    days.push(clampToNoon(new Date(cursor)));
    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
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
  const weeks = React.useMemo(() => getCalendarGrid(month), [month]);
  const monthLabel = React.useMemo(() => format(month, "MMMM yyyy"), [month]);

  const [open, setOpen] = React.useState(false);
  const [editor, setEditor] = React.useState(null);

  const [maxStock, setMaxStock] = React.useState(1);
  const items = data?.data ?? [];
  function isCurrentMonth(d) {
    return (
      d.getMonth() === month.getMonth() &&
      d.getFullYear() === month.getFullYear()
    );
  }

  const byDate = React.useMemo(() => {
    const map = new Map();
    for (const it of items) {
      map.set(isoToUTCDateOnly(it.event_date), it);
    }
    return map;
  }, [items]);

  function openForDate(day) {
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

    const payloadBase = {
      max_stock: parsed,
    };

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
        ...payloadBase,
      });
    } else {
      onUpdate?.({
        id: editor.item.id,
        payload: payloadBase,
      });
    }

    setOpen(false);
  }

  function handleDelete() {
    if (!editor || editor.mode !== "edit") return;
    console.log("editer", editor);
    console.log("editer", editor.item.id);

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
            onClick={() => setMonth(addMonths(month, -1))}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMonth(addMonths(month, 1))}
          >
            Next
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-sm font-medium">{monthLabel}</div>
          <div className="text-xs text-muted-foreground">
            {loading ? "Loading…" : `${items.length} days configured`}
          </div>
        </div>

        <Button size="sm" onClick={() => openForDate(new Date())}>
          + Set day stock
        </Button>
      </div>

      <div className="grid grid-cols-7 border-b text-xs text-muted-foreground">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="px-2 py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-6">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((day, di) => {
              const muted = !isCurrentMonth(day);

              const utc = new Date(
                Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()),
              );
              const key = dateToUTCDateOnly(utc);

              const it = byDate.get(key);

              return (
                <button
                  key={`${wi}-${di}-${key}`}
                  type="button"
                  onClick={() => openForDate(day)}
                  disabled={loading}
                  className={[
                    "min-h-[110px] border-b border-r p-2 text-left hover:bg-muted/30",
                    wi === 0 ? "border-t" : "",
                    di === 0 ? "border-l" : "",
                    "focus:outline-none focus:ring-2 focus:ring-ring",
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-muted/30",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`text-xs font-medium ${muted ? "text-muted-foreground" : ""}`}
                    >
                      {day.getDate()}
                    </div>

                    {it && (
                      <Badge variant="secondary" className="text-[10px]">
                        {it.current_stock}/{it.max_stock}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-2 space-y-1">
                    {it ? (
                      <div className="truncate rounded-md bg-primary/10 px-2 py-1 text-xs">
                        Max: {it.max_stock}{" "}
                        <span className="text-muted-foreground">
                          (current {it.current_stock})
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Click to set max stock
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setEditor(null);
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
                    ? dateToUTCDateOnly(
                        new Date(
                          Date.UTC(
                            editor.date.getFullYear(),
                            editor.date.getMonth(),
                            editor.date.getDate(),
                          ),
                        ),
                      )
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

          <DialogFooter className="gap-2 sm:gap-0">
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
