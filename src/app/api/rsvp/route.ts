import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { rsvpSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const normalized = {
      fullName: raw.fullName,
      email:
        typeof raw.email === "string" && raw.email.trim() === ""
          ? undefined
          : raw.email,
      phone:
        typeof raw.phone === "string" && raw.phone.trim() === ""
          ? undefined
          : raw.phone,
      message:
        typeof raw.message === "string" && raw.message.trim() === ""
          ? undefined
          : raw.message,
      attendanceStatus: raw.attendanceStatus,
      guestCount:
        raw.attendanceStatus === "DECLINED"
          ? undefined
          : typeof raw.guestCount === "number"
            ? raw.guestCount
            : raw.guestCount != null
              ? Number(raw.guestCount)
              : undefined,
    };

    const parsed = rsvpSchema.safeParse(normalized);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const d = parsed.data;
    await getPrisma().rsvp.create({
      data: {
        fullName: d.fullName,
        email: d.email ?? null,
        phone: d.phone ?? null,
        attendanceStatus: d.attendanceStatus,
        guestCount: d.attendanceStatus === "ACCEPTED" ? (d.guestCount ?? null) : null,
        message: d.message ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[rsvp]", e);
    return NextResponse.json(
      { error: "Unable to save your RSVP right now. Please try again later." },
      { status: 500 },
    );
  }
}
