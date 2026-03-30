import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Configuração de e-mail ausente." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from:     "Portfolio <onboarding@resend.dev>",
    to:       "goncalvescirqueira1213@gmail.com",
    replyTo:  email,
    subject:  `Nova mensagem de ${name} — Portfolio`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        <h2 style="margin-bottom:4px">Nova mensagem via portfolio</h2>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0"/>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin-top:16px"><strong>Mensagem:</strong></p>
        <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${message}</p>
      </div>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("[contact] Email sent:", data?.id);
  return NextResponse.json({ ok: true });
}
