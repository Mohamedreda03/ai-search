import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const searchPrompt = `
ابحث في الإنترنت عن: "${prompt}"

اعد المحتوي علي شكل html, css content حتي اتمكن من عرضه في الصحفه, ازا كان المحتوي باللغه العربيه اجعل ال dir="rtl" وان كان غير ذلك اجعل ال dir="ltr"
استخدم cairo font واضف inline styles اجعل المظهر جميلا واجله يملاء الصفحه

تعليمات مهمة:
1. ابحث أولاً باستخدام google_search عن المعلومات المطلوبة
2. اجمع أكبر عدد ممكن من المصادر الموثوقة والحديثة
3. اعرض المصادر بتنسيق واضح في بداية إجابتك
4. قدم ملخص شامل ومفيد بناءً على المصادر

تنسيق الإجابة المطلوب:

## 🔍 المصادر المرجعية:

1. **[عنوان المقال/الصفحة]** - [اسم الموقع]
   - الرابط: [URL كامل]
   - تاريخ النشر: [إذا كان متوفراً]
   - ملخص مختصر: [2-3 جمل عن محتوى المصدر]

2. **[عنوان المقال/الصفحة]** - [اسم الموقع]
   - الرابط: [URL كامل]
   - تاريخ النشر: [إذا كان متوفراً]
   - ملخص مختصر: [2-3 جمل عن محتوى المصدر]

[استمر بنفس التنسيق لجميع المصادر]

---

## 📋 الملخص التفصيلي:

[اكتب هنا ملخص شامل ومفصل بناءً على جميع المصادر التي وجدتها، مع ذكر المعلومات الأساسية والتفاصيل المهمة]

## 🎯 النقاط الرئيسية:

- [نقطة مهمة 1]
- [نقطة مهمة 2]
- [نقطة مهمة 3]

---
*تم البحث في ${new Date().toLocaleDateString("ar-SA")} باستخدام Google Search*
`;

    const result = streamText({
      model: google("gemini-2.5-flash"),
      tools: {
        google_search: google.tools.googleSearch({}),
      },
      prompt: searchPrompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate text", { status: 500 });
  }
}
