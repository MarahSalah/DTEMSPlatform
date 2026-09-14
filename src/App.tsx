import { useState, useRef, createContext, useContext } from "react";
import panelBg from "@/imports/download.png";

/* ─── App context ────────────────────────────────────────────────────────── */
type Lang  = "en" | "ar";
type Theme = "light" | "dark";
type Page  = "home" | "login" | "register-student" | "forgot-password";

interface AppCtxVal { lang:Lang; setLang(l:Lang):void; theme:Theme; setTheme(t:Theme):void; }
const AppCtx = createContext<AppCtxVal>({ lang:"en", setLang:()=>{}, theme:"light", setTheme:()=>{} });
const useApp = () => useContext(AppCtx);

/* ─── i18n ───────────────────────────────────────────────────────────────── */
const I18N = {
  en: {
    navAbout:"About", navServices:"Services", navCenters:"Centers", navSchools:"Schools", navLogin:"Login",
    heroBadge:"Digital Technical Education",
    heroTitle1:"Empowering Education", heroThrough:"Through", heroTitle2:"Technology",
    heroDesc:"DTEMS is a unified platform connecting students, parents, instructors, and educational centers — from Level 2 to Level 5.",
    heroGetStarted:"Get Started", heroLearnMore:"Learn More",
    stat1n:"12,000+", stat1l:"Active Students", stat2n:"48", stat2l:"Partner Schools",
    stat3n:"8", stat3l:"Training Centers", stat4n:"94%", stat4l:"Success Rate",
    aboutBadge:"About DTEMS",
    aboutTitle:"A smarter way to manage technical education",
    aboutP1:"DTEMS was designed to address the growing complexity of technical education management. Our platform creates a seamless experience for students, parents, instructors, and center administrators.",
    aboutP2:"From Level 2 through Level 5, we provide the tools needed for structured digital learning, real-time progress visibility, and institutional accountability.",
    aboutFounded:"Founded", aboutCurriculum:"Curriculum", aboutCertified:"Certified",
    servicesBadge:"What We Offer", servicesTitle:"Platform Services",
    centersBadge:"Our Network", centersTitle:"Training Centers",
    centersDesc:"DTEMS partners with leading technical training centers across the country.",
    schoolsBadge:"Trusted By", schoolsTitle:"Partner Schools",
    schoolsDesc:"Leading institutions that trust DTEMS to manage their technical education programs.",
    footerDesc:"Digital Technical Education Management System — empowering learners at every level.",
    footerPlatform:"Platform", footerAccount:"Account",
    footerLinks1:["About","Services","Centers","Schools"],
    footerLinks2:["Login","Register","Forgot Password"],
    footerRights:"© 2024 DTEMS. All rights reserved.",
    loginTitle:"Welcome back", loginSubtitle:"Sign in to your DTEMS account",
    loginEmail:"Email Address", loginPwd:"Password",
    loginRemember:"Remember me", loginForgot:"Forgot password?",
    fpTitle:"Forgot your password?", fpSubtitle:"Enter your email and we'll send you a reset code.",
    fpEmailLabel:"Email Address", fpSendBtn:"Send Reset Code", fpSendingBtn:"Sending...",
    fpOtpTitle:"Check your email", fpOtpSubtitle:"We sent a 6-digit code to",
    fpOtpSubtitle2:". Enter it to reset your password.",
    fpNewPwdTitle:"Set new password", fpNewPwdSubtitle:"Choose a strong password for your account.",
    fpNewPwd:"New Password", fpConfirmPwd:"Confirm New Password",
    fpResetBtn:"Reset Password", fpResettingBtn:"Resetting...",
    fpSuccessTitle:"Password updated!", fpSuccessSubtitle:"Your password has been changed. You can now sign in.",
    fpBackLogin:"Back to login", fpChangeEmail:"Change email",
    loginBtn:"Login", loginBtnLoading:"Signing in...",
    loginNoAccount:"Don't have an account? ", loginRegister:"Register now",
    loginBackHome:"← Back to home",
    regTitle:"Student Registration",
    regSubtitle:"Fill in your details to create a DTEMS student account.",
    regBackLogin:"Back to login",
    regSec1:"Personal Information", regSec2:"Academic Information", regSec3:"Account Information",
    regFirstName:"First Name", regMiddleName:"Middle Name", regLastName:"Last Name",
    regLevel:"Academic Level", regLevelPh:"Select your academic level",
    regInstitution:"Educational Institution", regInstitutionPh:"Enter your school or institution name",
    regStudentEmail:"Student Email", regParentEmail:"Parent Email",
    regPhone:"Phone Number",
    regPwd:"Password", regConfirmPwd:"Confirm Password",
    regCreateBtn:"Create Student Account", regCreatingBtn:"Creating account...",
    regHaveAccount:"Already have an account? ", regSignIn:"Sign in",
    regTerms1:"I agree to DTEMS ", regTermsService:"Terms of Service", regAnd:" and ", regPrivacy:"Privacy Policy",
    otpChangeEmail:"Change email", otpTitle:"Verify your email",
    otpSentTo:"We sent a 6-digit code to", otpSentTo2:". Enter it below to activate your account.",
    otpLabel:"Verification Code", otpVerifyBtn:"Verify & Continue", otpVerifyingBtn:"Verifying...",
    otpResend:"Didn't receive a code?", otpResendLink:"Resend",
    errFillAll:"Please fill in all fields.",
    errInvalidEmail:"Enter a valid email address (e.g. name@gmail.com).",
    errInvalidCreds:"Invalid email or password.",
    pwdRule1:"At least 8 characters", pwdRule2:"One uppercase letter (A–Z)", pwdRule3:"One special character (!@#…)",
    pwdWeak:"Weak", pwdFair:"Fair", pwdGood:"Good", pwdStrong:"Strong",
    emailAvailable:"Email is available", emailTaken:"This email is already registered.", emailSignIn:"Sign in instead →",
    phoneValidLabel:"Valid number",
    errRequired:"Required.", errSelectLevel:"Please select a level.",
    errInstitutionReq:"Educational institution is required.",
    errEmailReq:"Email is required.", errEmailTaken:"This email is already registered.",
    errParentEmail:"Enter a valid email address.",
    errPhoneReq:"Phone number is required.", errPhoneDigits:"Must be exactly {n} digits for {code}.",
    errPwdReq:"Password is required.", errPwdRules:"Password does not meet all requirements.",
    errConfirmReq:"Please confirm your password.", errConfirmMismatch:"Passwords do not match.",
    errTerms:"You must agree to continue.",
    pwdsMatch:"Passwords match", completeReqs:"Complete all password requirements above to continue",
    emailValidFmt:"Please enter a valid email address.",
    phoneDigitsOf:"{n}/{total} digits", optionalLabel:"(optional)",
  },
  ar: {
    navAbout:"عن المنصة", navServices:"الخدمات", navCenters:"المراكز", navSchools:"المدارس", navLogin:"تسجيل الدخول",
    heroBadge:"التعليم التقني الرقمي",
    heroTitle1:"تمكين التعليم", heroThrough:"من خلال", heroTitle2:"التكنولوجيا",
    heroDesc:"DTEMS منصة موحدة تربط الطلاب وأولياء الأمور والمدرسين والمراكز التعليمية — من المستوى الثاني إلى الخامس.",
    heroGetStarted:"ابدأ الآن", heroLearnMore:"اعرف أكثر",
    stat1n:"+12,000", stat1l:"طالب نشط", stat2n:"48", stat2l:"مدرسة شريكة",
    stat3n:"8", stat3l:"مراكز تدريب", stat4n:"94%", stat4l:"معدل النجاح",
    aboutBadge:"عن DTEMS",
    aboutTitle:"طريقة أذكى لإدارة التعليم التقني",
    aboutP1:"صُمِّمت DTEMS لمواجهة التعقيد المتزايد في إدارة التعليم التقني. توفر منصتنا تجربة سلسة للطلاب وأولياء الأمور والمدرسين ومديري المراكز.",
    aboutP2:"من المستوى الثاني حتى الخامس، نوفر الأدوات اللازمة للتعلم الرقمي المنظم وتتبع التقدم الفوري والمساءلة المؤسسية.",
    aboutFounded:"تأسست", aboutCurriculum:"مناهج", aboutCertified:"معتمدة",
    servicesBadge:"ما نقدمه", servicesTitle:"خدمات المنصة",
    centersBadge:"شبكتنا", centersTitle:"مراكز التدريب",
    centersDesc:"تتشارك DTEMS مع كبرى مراكز التدريب التقني في المنطقة.",
    schoolsBadge:"يثقون بنا", schoolsTitle:"المدارس الشريكة",
    schoolsDesc:"مؤسسات رائدة تثق بـ DTEMS لإدارة برامجها التقنية التعليمية.",
    footerDesc:"نظام إدارة التعليم التقني الرقمي — نُمكّن المتعلمين في كل مستوى.",
    footerPlatform:"المنصة", footerAccount:"الحساب",
    footerLinks1:["عن المنصة","الخدمات","المراكز","المدارس"],
    footerLinks2:["تسجيل الدخول","تسجيل حساب","نسيت كلمة المرور"],
    footerRights:"© 2024 DTEMS. جميع الحقوق محفوظة.",
    loginTitle:"أهلاً بعودتك", loginSubtitle:"سجّل دخولك إلى حسابك في DTEMS",
    loginEmail:"البريد الإلكتروني", loginPwd:"كلمة المرور",
    loginRemember:"تذكرني", loginForgot:"نسيت كلمة المرور؟",
    fpTitle:"نسيت كلمة المرور؟", fpSubtitle:"أدخل بريدك الإلكتروني وسنرسل لك رمز إعادة التعيين.",
    fpEmailLabel:"البريد الإلكتروني", fpSendBtn:"إرسال رمز إعادة التعيين", fpSendingBtn:"جارٍ الإرسال...",
    fpOtpTitle:"تحقق من بريدك الإلكتروني", fpOtpSubtitle:"أرسلنا رمزاً مكوناً من 6 أرقام إلى",
    fpOtpSubtitle2:". أدخله لإعادة تعيين كلمة المرور.",
    fpNewPwdTitle:"تعيين كلمة مرور جديدة", fpNewPwdSubtitle:"اختر كلمة مرور قوية لحسابك.",
    fpNewPwd:"كلمة المرور الجديدة", fpConfirmPwd:"تأكيد كلمة المرور الجديدة",
    fpResetBtn:"إعادة تعيين كلمة المرور", fpResettingBtn:"جارٍ إعادة التعيين...",
    fpSuccessTitle:"تم تحديث كلمة المرور!", fpSuccessSubtitle:"تم تغيير كلمة المرورك. يمكنك الآن تسجيل الدخول.",
    fpBackLogin:"العودة لتسجيل الدخول", fpChangeEmail:"تغيير البريد الإلكتروني",
    loginBtn:"تسجيل الدخول", loginBtnLoading:"جارٍ التسجيل...",
    loginNoAccount:"ليس لديك حساب؟ ", loginRegister:"سجّل الآن",
    loginBackHome:"→ العودة للرئيسية",
    regTitle:"تسجيل طالب جديد",
    regSubtitle:"أدخل بياناتك لإنشاء حساب طالب في DTEMS.",
    regBackLogin:"العودة لتسجيل الدخول",
    regSec1:"المعلومات الشخصية", regSec2:"المعلومات الأكاديمية", regSec3:"معلومات الحساب",
    regFirstName:"الاسم الأول", regMiddleName:"الاسم الأوسط", regLastName:"اسم العائلة",
    regLevel:"المستوى الأكاديمي", regLevelPh:"اختر مستواك الأكاديمي",
    regInstitution:"المؤسسة التعليمية", regInstitutionPh:"أدخل اسم مدرستك أو مؤسستك",
    regStudentEmail:"البريد الإلكتروني للطالب", regParentEmail:"البريد الإلكتروني لولي الأمر",
    regPhone:"رقم الهاتف",
    regPwd:"كلمة المرور", regConfirmPwd:"تأكيد كلمة المرور",
    regCreateBtn:"إنشاء حساب الطالب", regCreatingBtn:"جارٍ إنشاء الحساب...",
    regHaveAccount:"لديك حساب بالفعل؟ ", regSignIn:"سجّل دخولك",
    regTerms1:"أوافق على ", regTermsService:"شروط الخدمة", regAnd:" و", regPrivacy:"سياسة الخصوصية",
    otpChangeEmail:"تغيير البريد", otpTitle:"تحقق من بريدك الإلكتروني",
    otpSentTo:"أرسلنا رمزاً مكوناً من 6 أرقام إلى", otpSentTo2:". أدخله أدناه لتفعيل حسابك.",
    otpLabel:"رمز التحقق", otpVerifyBtn:"تحقق ومتابعة", otpVerifyingBtn:"جارٍ التحقق...",
    otpResend:"لم تستلم الرمز؟", otpResendLink:"إعادة الإرسال",
    errFillAll:"يرجى ملء جميع الحقول.",
    errInvalidEmail:"أدخل بريداً إلكترونياً صحيحاً (مثال: name@gmail.com).",
    errInvalidCreds:"البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    pwdRule1:"8 أحرف على الأقل", pwdRule2:"حرف كبير واحد (A–Z)", pwdRule3:"رمز خاص واحد (!@#…)",
    pwdWeak:"ضعيفة", pwdFair:"مقبولة", pwdGood:"جيدة", pwdStrong:"قوية",
    emailAvailable:"البريد الإلكتروني متاح", emailTaken:"هذا البريد مسجّل مسبقاً.", emailSignIn:"تسجيل الدخول بدلاً →",
    phoneValidLabel:"رقم صحيح",
    errRequired:"مطلوب.", errSelectLevel:"يرجى اختيار المستوى.",
    errInstitutionReq:"اسم المؤسسة التعليمية مطلوب.",
    errEmailReq:"البريد الإلكتروني مطلوب.", errEmailTaken:"هذا البريد مسجّل مسبقاً.",
    errParentEmail:"أدخل بريداً إلكترونياً صحيحاً.",
    errPhoneReq:"رقم الهاتف مطلوب.", errPhoneDigits:"يجب أن يكون {n} رقماً لـ {code}.",
    errPwdReq:"كلمة المرور مطلوبة.", errPwdRules:"كلمة المرور لا تستوفي المتطلبات.",
    errConfirmReq:"يرجى تأكيد كلمة المرور.", errConfirmMismatch:"كلمتا المرور غير متطابقتين.",
    errTerms:"يجب الموافقة للمتابعة.",
    pwdsMatch:"كلمتا المرور متطابقتان", completeReqs:"أكمل متطلبات كلمة المرور للمتابعة",
    emailValidFmt:"يرجى إدخال بريد إلكتروني صحيح.",
    phoneDigitsOf:"{n}/{total} رقم", optionalLabel:"(اختياري)",
  }
} as const;
type T = typeof I18N.en;

/* ─── Mock / helpers ─────────────────────────────────────────────────────── */
const TAKEN_EMAILS = new Set(["test@dtems.edu","student@school.com","pending@dtems.edu","notverified@test.com"]);
const MOCK_OTP = "123456";
type EmailStatus = "available"|"taken"|"invalid";

const KNOWN_TLDS = new Set([
  "com","net","org","edu","gov","mil","int","io","co","app","dev","ai","tech","online","site","web",
  "store","shop","info","biz","name","pro","mobi","tv","cc","me","us","ca","uk","au","de","fr","es",
  "it","nl","se","no","dk","fi","pl","ru","jp","cn","in","br","mx","ar","za","ng","ke","gh","eg",
  "sa","ae","jo","ps","iq","sy","lb","kw","bh","qa","om","ye","ly","tn","ma","dz","sd","so","et",
  "pk","bd","lk","np","af","ir","tr","id","my","ph","sg","th","vn",
]);
const KNOWN_DOMAINS = new Set([
  "gmail","yahoo","hotmail","outlook","live","icloud","me","mac","proton","protonmail","aol","msn",
  "yandex","zoho","gmx","mail","fastmail","tutanota","hey","pm","inbox","posteo","runbox","maktoob","eim",
]);

function isValidEmail(v:string):boolean{
  if(!v) return false;
  const lower=v.toLowerCase().trim();
  if(!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(lower)) return false;
  const atIdx=lower.indexOf("@");
  const local=lower.slice(0,atIdx);
  const domain=lower.slice(atIdx+1);
  if(local.startsWith(".")||local.endsWith(".")||/\.\./.test(local)) return false;
  if(local.length<1||local.length>64) return false;
  const parts=domain.split(".");
  if(parts.length<2||/\.\./.test(domain)||domain.startsWith("-")||domain.endsWith("-")) return false;
  const tld=parts[parts.length-1];
  if(!KNOWN_TLDS.has(tld)) return false;
  const sld=parts[parts.length-2];
  if(sld.length<2||sld.startsWith("-")||sld.endsWith("-")) return false;
  if(sld.length>=8&&!/[aeiou]/.test(sld)&&!KNOWN_DOMAINS.has(sld)) return false;
  return true;
}
function emailStatus(v:string):EmailStatus{
  if(!isValidEmail(v)) return "invalid";
  if(TAKEN_EMAILS.has(v.toLowerCase())) return "taken";
  return "available";
}

const COUNTRY_CODES=[
  {code:"+962",label:"+962 Jordan",      digits:9},
  {code:"+970",label:"+970 Palestine",   digits:9},
  {code:"+966",label:"+966 Saudi Arabia",digits:9},
  {code:"+971",label:"+971 UAE",         digits:9},
  {code:"+965",label:"+965 Kuwait",      digits:8},
  {code:"+973",label:"+973 Bahrain",     digits:8},
  {code:"+974",label:"+974 Qatar",       digits:8},
  {code:"+968",label:"+968 Oman",        digits:8},
  {code:"+20", label:"+20 Egypt",        digits:10},
  {code:"+216",label:"+216 Tunisia",     digits:8},
  {code:"+212",label:"+212 Morocco",     digits:9},
  {code:"+213",label:"+213 Algeria",     digits:9},
  {code:"+961",label:"+961 Lebanon",     digits:8},
  {code:"+963",label:"+963 Syria",       digits:9},
  {code:"+964",label:"+964 Iraq",        digits:10},
  {code:"+1",  label:"+1 US/Canada",     digits:10},
  {code:"+44", label:"+44 UK",           digits:10},
  {code:"+49", label:"+49 Germany",      digits:10},
  {code:"+33", label:"+33 France",       digits:9},
  {code:"+90", label:"+90 Turkey",       digits:10},
];
function phoneDigitsFor(code:string):number{
  return COUNTRY_CODES.find(c=>c.code===code)?.digits??9;
}

const PWD_RULES_KEYS: Array<keyof T> = ["pwdRule1","pwdRule2","pwdRule3"];
const PWD_FNS = [
  (p:string)=>p.length>=8,
  (p:string)=>/[A-Z]/.test(p),
  (p:string)=>/[^A-Za-z0-9]/.test(p),
];
const allRulesMet=(p:string)=>PWD_FNS.every(fn=>fn(p));

/* ─── Style primitives (CSS-var aware) ──────────────────────────────────── */
const baseInput:React.CSSProperties={
  width:"100%",paddingTop:"15px",paddingBottom:"15px",paddingLeft:"18px",paddingRight:"18px",
  fontSize:"17px",fontFamily:"'Manrope',sans-serif",fontWeight:400,
  color:"var(--c-text)",background:"var(--c-input-bg)",
  borderWidth:"1.5px",borderStyle:"solid",borderColor:"var(--c-border)",borderRadius:"8px",
  outline:"none",transition:"border-color .18s,box-shadow .18s,background .18s",boxSizing:"border-box",
};
const baseInputIcon:React.CSSProperties={...baseInput,paddingRight:"50px"};
const phoneCodeSel:React.CSSProperties={...baseInput,paddingRight:"36px",width:"180px",cursor:"pointer"};
const focusCss:React.CSSProperties={
  borderColor:"var(--c-focus-border)",boxShadow:"0 0 0 3px var(--c-focus-shadow)",background:"var(--c-card)"
};
const errCss:React.CSSProperties={borderColor:"#C0392B",boxShadow:"0 0 0 3px rgba(192,57,43,.08)",background:"var(--c-card)"};

/* ═══════════════════════════════════════════════════════════════════════════
   UI PRIMITIVES
═══════════════════════════════════════════════════════════════════════════ */
function Lbl({children,optional,t}:{children:React.ReactNode;optional?:boolean;t?:T}){
  return(
    <label style={{display:"flex",alignItems:"center",gap:"5px",fontFamily:"'Manrope',sans-serif",fontSize:"16px",fontWeight:600,color:"var(--c-text)",marginBottom:"8px",letterSpacing:".01em"}}>
      {children}
      {optional&&<span style={{fontWeight:400,color:"var(--c-text-muted)",fontSize:"14px"}}>{t?.optionalLabel??"(optional)"}</span>}
    </label>
  );
}
function FErr({msg}:{msg?:string}){
  return msg?<p style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:500,color:"#C0392B",marginTop:"6px",lineHeight:1.4}}>{msg}</p>:null;
}
function TxtInput({value,onChange,placeholder,focused,onFocus,onBlur,type="text",autoComplete,hasErr}:{
  value:string;onChange:(v:string)=>void;placeholder:string;focused:boolean;
  onFocus:()=>void;onBlur:()=>void;type?:string;autoComplete?:string;hasErr?:boolean;
}){
  return(
    <input type={type} value={value} onChange={e=>onChange(e.target.value)}
      onFocus={onFocus} onBlur={onBlur} placeholder={placeholder} autoComplete={autoComplete}
      style={{...baseInput,...(focused?focusCss:{}),...(hasErr?errCss:{})}}/>
  );
}
function PwdInput({value,onChange,show,onToggle,focused,onFocus,onBlur,placeholder,hasErr}:{
  value:string;onChange:(v:string)=>void;show:boolean;onToggle:()=>void;
  focused:boolean;onFocus:()=>void;onBlur:()=>void;placeholder:string;hasErr?:boolean;
}){
  return(
    <div style={{position:"relative"}}>
      <input type={show?"text":"password"} value={value}
        onChange={e=>onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} placeholder={placeholder}
        style={{...baseInputIcon,...(focused?focusCss:{}),...(hasErr?errCss:{})}}/>
      <button type="button" onClick={onToggle}
        style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--c-text-muted)",display:"flex",padding:"2px",transition:"color .15s"}}
        onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--c-primary)")}
        onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="var(--c-text-muted)")}>
        {show
          ?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          :<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        }
      </button>
    </div>
  );
}
function PhoneInput({countryCode,onCodeChange,phone,onPhoneChange,focusedCode,focusedNum,onFocusCode,onFocusNum,onBlurCode,onBlurNum,hasErr}:{
  countryCode:string;onCodeChange:(v:string)=>void;
  phone:string;onPhoneChange:(v:string)=>void;
  focusedCode:boolean;focusedNum:boolean;
  onFocusCode:()=>void;onFocusNum:()=>void;
  onBlurCode:()=>void;onBlurNum:()=>void;
  hasErr?:boolean;
}){
  const digits=phoneDigitsFor(countryCode);
  return(
    <div style={{display:"flex",gap:"8px"}}>
      <div style={{position:"relative",flexShrink:0}}>
        <select value={countryCode} onChange={e=>onCodeChange(e.target.value)}
          onFocus={onFocusCode} onBlur={onBlurCode}
          style={{...phoneCodeSel,...(focusedCode?focusCss:{}),...(hasErr?errCss:{})}}>
          {COUNTRY_CODES.map(c=>(
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <input type="tel" value={phone}
        onChange={e=>onPhoneChange(e.target.value.replace(/[^\d]/g,"").slice(0,digits))}
        onFocus={onFocusNum} onBlur={onBlurNum}
        maxLength={digits}
        style={{...baseInput,flex:1,...(focusedNum?focusCss:{}),...(hasErr?errCss:{})}}/>
    </div>
  );
}
function SectionHeading({number,title}:{number:string;title:string}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"22px"}}>
      <div style={{width:"28px",height:"28px",borderRadius:"7px",flexShrink:0,background:"var(--c-primary)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:700,color:"#fff"}}>{number}</div>
      <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"17px",fontWeight:700,color:"var(--c-text)",letterSpacing:".01em"}}>{title}</span>
      <div style={{flex:1,height:"1px",background:"var(--c-border)"}}/>
    </div>
  );
}
function PwdRules({password,t}:{password:string;t:T}){
  if(!password) return null;
  return(
    <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"8px"}}>
      {PWD_RULES_KEYS.map((key,i)=>{
        const ok=PWD_FNS[i](password);
        return(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"7px"}}>
            <div style={{width:"14px",height:"14px",borderRadius:"50%",flexShrink:0,background:ok?"rgba(22,163,74,.1)":"rgba(0,0,0,.04)",border:ok?"1.5px solid #16A34A":"1.5px solid var(--c-border)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
              {ok&&<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
            <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:500,color:ok?"#15803D":"var(--c-text-muted)",transition:"color .2s"}}>{t[key]}</span>
          </div>
        );
      })}
    </div>
  );
}
function PwdBar({password,t}:{password:string;t:T}){
  if(!password) return null;
  const met=PWD_FNS.filter(fn=>fn(password)).length;
  const score=Math.min(4,met+(password.length>=14?1:0));
  const colors=["","#EF4444","#F59E0B","#3B82F6","#16A34A"];
  const labels=["",(t.pwdWeak as string),(t.pwdFair as string),(t.pwdGood as string),(t.pwdStrong as string)];
  return(
    <div style={{display:"flex",alignItems:"center",gap:"8px",marginTop:"10px"}}>
      <div style={{flex:1,display:"flex",gap:"3px"}}>
        {[1,2,3,4].map(n=><div key={n} style={{flex:1,height:"3px",borderRadius:"2px",background:n<=score?colors[score]:"var(--c-border)",transition:"background .25s"}}/>)}
      </div>
      <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"12px",fontWeight:700,color:colors[score],minWidth:"46px"}}>{labels[score]}</span>
    </div>
  );
}
function EmailFeedback({email,onGoLogin,t}:{email:string;onGoLogin:()=>void;t:T}){
  const status=emailStatus(email);
  if(!email||status==="invalid") return null;
  if(status==="available"){
    return(
      <div style={{marginTop:"6px",display:"flex",alignItems:"center",gap:"7px"}}>
        <div style={{width:"18px",height:"18px",borderRadius:"50%",flexShrink:0,background:"rgba(22,163,74,.1)",border:"1.5px solid #16A34A",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:600,color:"#15803D",margin:0}}>{t.emailAvailable}</p>
      </div>
    );
  }
  return(
    <div style={{marginTop:"8px",padding:"10px 13px",borderRadius:"8px",background:"rgba(192,57,43,.06)",border:"1px solid rgba(192,57,43,.2)",display:"flex",gap:"9px",alignItems:"flex-start"}}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:"1px"}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:500,color:"#C0392B",lineHeight:1.5,margin:0}}>
        {t.emailTaken}{" "}
        <a href="#" onClick={e=>{e.preventDefault();onGoLogin();}} style={{color:"var(--c-primary)",fontWeight:700,textDecoration:"none"}}>{t.emailSignIn}</a>
      </p>
    </div>
  );
}
function SubmitBtn({loading,disabled,label,loadingLabel}:{loading:boolean;disabled?:boolean;label:string;loadingLabel:string}){
  const off=loading||disabled;
  return(
    <button type="submit" disabled={off}
      style={{width:"100%",padding:"17px",borderRadius:"10px",border:"none",cursor:off?"not-allowed":"pointer",background:disabled&&!loading?"rgba(5,74,158,.35)":loading?"var(--c-primary)":"var(--c-primary)",color:"#fff",fontFamily:"'Manrope',sans-serif",fontSize:"18px",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all .2s",boxShadow:off?"none":"0 4px 14px rgba(5,74,158,.3)",opacity:disabled&&!loading?.6:1}}
      onMouseEnter={e=>{if(!off){const b=e.currentTarget as HTMLButtonElement;b.style.background="var(--c-primary-hov)";b.style.transform="translateY(-1px)";b.style.boxShadow="0 6px 20px rgba(5,74,158,.4)";}}}
      onMouseLeave={e=>{if(!off){const b=e.currentTarget as HTMLButtonElement;b.style.background="var(--c-primary)";b.style.transform="translateY(0)";b.style.boxShadow="0 4px 14px rgba(5,74,158,.3)";}}}
    >
      {loading&&<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{animation:"spin .75s linear infinite"}}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>}
      {loading?loadingLabel:label}
    </button>
  );
}
function NavLink2({children,onClick}:{children:React.ReactNode;onClick:()=>void}){
  return(
    <a href="#" onClick={e=>{e.preventDefault();onClick();}}
      style={{fontFamily:"'Manrope',sans-serif",fontSize:"16px",fontWeight:600,color:"var(--c-primary)",textDecoration:"none",transition:"color .15s"}}
      onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--c-accent)")}
      onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="var(--c-primary)")}>
      {children}
    </a>
  );
}
function TermsCheck({checked,onChange,error,t}:{checked:boolean;onChange:(v:boolean)=>void;error?:string;t:T}){
  return(
    <div>
      <label style={{display:"flex",alignItems:"flex-start",gap:"10px",cursor:"pointer"}} onClick={()=>onChange(!checked)}>
        <div style={{width:"17px",height:"17px",borderRadius:"4px",flexShrink:0,marginTop:"1px",border:error?"1.5px solid #C0392B":checked?"1.5px solid var(--c-primary)":"1.5px solid var(--c-border)",background:checked?"var(--c-primary)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s"}}>
          {checked&&<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
        <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"15px",color:"var(--c-text-sub)",lineHeight:1.7}}>
          {t.regTerms1}
          <a href="#" style={{color:"var(--c-primary)",fontWeight:600,textDecoration:"none"}} onClick={e=>e.stopPropagation()}>{t.regTermsService}</a>
          {t.regAnd}
          <a href="#" style={{color:"var(--c-primary)",fontWeight:600,textDecoration:"none"}} onClick={e=>e.stopPropagation()}>{t.regPrivacy}</a>
        </span>
      </label>
      <FErr msg={error}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LANDING PAGE DATA
═══════════════════════════════════════════════════════════════════════════ */
const SERVICES_EN=[
  {icon:"📊",title:"Progress Tracking",   desc:"Real-time dashboards for students, parents, and instructors to monitor academic growth."},
  {icon:"📚",title:"Digital Curriculum",  desc:"Structured digital content aligned with national technical education standards."},
  {icon:"👪",title:"Parent Portal",        desc:"Parents stay informed with live grade updates, attendance records, and teacher notes."},
  {icon:"📝",title:"Assessments",          desc:"Online quizzes, exams, and assignments with automatic grading and instant feedback."},
  {icon:"🏫",title:"Center Management",   desc:"Administrative tools for managing students, staff, schedules, and center resources."},
  {icon:"🎓",title:"Level Certification", desc:"Automated certification issuance upon completion of each academic level."},
];
const SERVICES_AR=[
  {icon:"📊",title:"تتبع التقدم",          desc:"لوحات معلومات فورية للطلاب وأولياء الأمور والمدرسين لمتابعة النمو الأكاديمي."},
  {icon:"📚",title:"المناهج الرقمية",      desc:"محتوى رقمي منظم متوافق مع معايير التعليم التقني الوطني."},
  {icon:"👪",title:"بوابة أولياء الأمور",  desc:"يطّلع أولياء الأمور على الدرجات والحضور وملاحظات المعلمين فورياً."},
  {icon:"📝",title:"التقييمات",            desc:"اختبارات وامتحانات وواجبات إلكترونية مع تصحيح تلقائي وتغذية راجعة فورية."},
  {icon:"🏫",title:"إدارة المراكز",        desc:"أدوات إدارية لإدارة الطلاب والموظفين والجداول وموارد المركز."},
  {icon:"🎓",title:"شهادات المستويات",     desc:"إصدار شهادات آلي عند إتمام كل مستوى أكاديمي."},
];
const CENTERS_EN=["Amman Technical Center","Zarqa Digital Institute","Irbid Education Hub","Aqaba Learning Center","Madaba Tech Academy","Salt Vocational Center","Karak Digital Campus","Mafraq Training Center"];
const CENTERS_AR=["مركز عمان التقني","معهد الزرقاء الرقمي","مركز إربد التعليمي","مركز العقبة للتعلم","أكاديمية مادبا التقنية","مركز السلط المهني","حرم الكرك الرقمي","مركز المفرق للتدريب"];
const SCHOOLS_EN=["Al-Ahliyya School","Modern Academy","National Technical School","Future Leaders Academy","Al-Rasheed School","Pioneer Institute","Excellence Academy","Digital Gateway School"];
const SCHOOLS_AR=["مدرسة الأهلية","الأكاديمية الحديثة","المدرسة الوطنية التقنية","أكاديمية قادة المستقبل","مدرسة الرشيد","معهد الرواد","أكاديمية التميز","مدرسة البوابة الرقمية"];

/* ═══════════════════════════════════════════════════════════════════════════
   LEFT AUTH PANEL
═══════════════════════════════════════════════════════════════════════════ */
function VisualPanel(){
  return(
    <div className="hidden lg:flex flex-col flex-shrink-0 relative overflow-hidden"
      style={{width:"40%",background:"#050E1C",position:"sticky",top:0,height:"100dvh",alignSelf:"flex-start"}}>
      <img src={panelBg} alt="DTEMS educational platform"
        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(4,10,26,.18) 0%,rgba(4,10,26,.1) 50%,rgba(4,10,26,.82) 80%,rgba(4,10,26,.96) 100%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"32px 36px",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"6px",zIndex:4}}>
        <div style={{fontFamily:"'PT Serif Caption',serif",fontSize:"26px",fontWeight:400,color:"#FFFFFF",letterSpacing:".05em"}}>DTEMS</div>
        <div style={{fontFamily:"'Manrope',sans-serif",fontSize:"12px",fontWeight:500,color:"rgba(255,255,255,.5)",letterSpacing:".14em",textTransform:"uppercase",lineHeight:1.8}}>
          Digital Technical Education<br/>Management System
        </div>
        <div style={{width:"36px",height:"3px",borderRadius:"2px",background:"#FE871E",marginTop:"4px"}}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AUTH SHELLS
═══════════════════════════════════════════════════════════════════════════ */
function LoginShell({children}:{children:React.ReactNode}){
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflowY:"auto",background:"var(--c-auth-shell)",padding:"40px 24px",minHeight:"100dvh"}}>
      <div style={{width:"100%",maxWidth:"440px"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:"28px"}}>
          <img src="/src/imports/Create_a_clean__modern__professional_logo_for_a_BT11.png" alt="DTEMS" style={{height:"100px",objectFit:"contain"}}/>
        </div>
        <div style={{background:"var(--c-card)",borderRadius:"18px",padding:"44px 40px",boxShadow:"0 1px 3px rgba(0,0,0,.06),0 4px 24px rgba(0,0,0,.08)",border:"1px solid var(--c-border)"}}>
          {children}
        </div>
      </div>
    </div>
  );
}
function RegisterShell({children}:{children:React.ReactNode}){
  return(
    <div style={{flex:1,overflowY:"auto",background:"var(--c-reg-shell)",minHeight:"100dvh"}}>
      <div style={{position:"sticky",top:0,zIndex:10,background:"var(--c-reg-hdr)",backdropFilter:"blur(8px)",borderBottom:"1px solid var(--c-border)",padding:"16px 32px",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img src="/src/imports/Create_a_clean__modern__professional_logo_for_a_BT11.png" alt="DTEMS" style={{height:"56px",objectFit:"contain"}}/>
      </div>
      <div style={{maxWidth:"580px",margin:"0 auto",padding:"40px 24px 60px"}}>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LANDING PAGE
═══════════════════════════════════════════════════════════════════════════ */
function LandingPage({onNavigate}:{onNavigate:(p:Page)=>void}){
  const {lang,setLang,theme,setTheme}=useApp();
  const t=I18N[lang] as T;
  const [mobileMenu,setMobileMenu]=useState(false);
  const isRtl=lang==="ar";

  const services=lang==="ar"?SERVICES_AR:SERVICES_EN;
  const centers=lang==="ar"?CENTERS_AR:CENTERS_EN;
  const schools=lang==="ar"?SCHOOLS_AR:SCHOOLS_EN;

  const scrollTo=(id:string)=>{
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setMobileMenu(false);
  };

  const navItems:[string,string][]=[
    [t.navAbout,"about"],[t.navServices,"services"],[t.navCenters,"centers"],[t.navSchools,"schools"]
  ];

  return(
    <div style={{fontFamily:"'Manrope',sans-serif",color:"var(--c-text)",background:"var(--c-bg)",minHeight:"100dvh"}}>

      {/* ── NAVBAR ── */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"var(--c-nav-bg)",backdropFilter:"blur(10px)",borderBottom:"1px solid var(--c-nav-border)"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 24px",height:"68px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <img src="/src/imports/Create_a_clean__modern__professional_logo_for_a_BT11.png" alt="DTEMS" style={{height:"44px",objectFit:"contain",cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}/>
          <div className="hidden md:flex" style={{gap:"32px",alignItems:"center"}}>
            {navItems.map(([l,id])=>(
              <button key={id} onClick={()=>scrollTo(id)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:"15px",fontWeight:500,color:"var(--c-text-muted)",transition:"color .15s",padding:0}}
                onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--c-primary)")}
                onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="var(--c-text-muted)")}>
                {l}
              </button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            {/* Language toggle */}
            <button onClick={()=>setLang(lang==="en"?"ar":"en")}
              style={{padding:"7px 14px",borderRadius:"7px",border:"1.5px solid var(--c-border)",cursor:"pointer",background:"transparent",fontFamily:"'Manrope',sans-serif",fontSize:"13px",fontWeight:600,color:"var(--c-text)",transition:"all .18s",display:"flex",alignItems:"center",gap:"5px"}}
              onMouseEnter={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.borderColor="var(--c-primary)";b.style.color="var(--c-primary)";}}
              onMouseLeave={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.borderColor="var(--c-border)";b.style.color="var(--c-text)";}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
              {lang==="en"?"العربية":"English"}
            </button>
            {/* Theme toggle */}
            <button onClick={()=>setTheme(theme==="light"?"dark":"light")}
              style={{width:"36px",height:"36px",borderRadius:"8px",border:"1.5px solid var(--c-border)",cursor:"pointer",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--c-text)",transition:"all .18s"}}
              onMouseEnter={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.borderColor="var(--c-primary)";b.style.color="var(--c-primary)";}}
              onMouseLeave={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.borderColor="var(--c-border)";b.style.color="var(--c-text)";}}>
              {theme==="light"
                ?<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                :<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              }
            </button>
            <button onClick={()=>onNavigate("login")}
              style={{padding:"9px 22px",borderRadius:"8px",border:"none",cursor:"pointer",background:"var(--c-primary)",color:"#fff",fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:600,boxShadow:"0 2px 8px rgba(5,74,158,.28)",transition:"all .18s"}}
              onMouseEnter={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.background="var(--c-primary-hov)";b.style.transform="translateY(-1px)";}}
              onMouseLeave={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.background="var(--c-primary)";b.style.transform="translateY(0)";}}>
              {t.navLogin}
            </button>
            <button className="md:hidden" onClick={()=>setMobileMenu(!mobileMenu)}
              style={{background:"none",border:"1px solid var(--c-border)",borderRadius:"6px",padding:"6px 8px",cursor:"pointer",color:"var(--c-text)"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenu?(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>):(<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>)}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenu&&(
          <div style={{borderTop:"1px solid var(--c-border)",padding:"12px 24px 16px",display:"flex",flexDirection:"column",gap:"8px",background:"var(--c-card)"}} className="md:hidden">
            {navItems.map(([l,id])=>(
              <button key={id} onClick={()=>scrollTo(id)} style={{background:"none",border:"none",cursor:"pointer",textAlign:isRtl?"right":"left",fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:500,color:"var(--c-text)",padding:"8px 0"}}>{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO (always dark gradient, no theme change needed) ── */}
      <section style={{background:"linear-gradient(135deg,#071E3D 0%,#054A9E 55%,#0A3B82 100%)",minHeight:"90vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-80px",right:"-80px",width:"500px",height:"500px",borderRadius:"50%",background:"rgba(255,255,255,.03)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-60px",left:"-60px",width:"360px",height:"360px",borderRadius:"50%",background:"rgba(254,135,30,.06)",pointerEvents:"none"}}/>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"80px 24px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px",alignItems:"center",width:"100%"}} className="hero-grid">
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(254,135,30,.15)",borderRadius:"20px",padding:"5px 14px",marginBottom:"24px"}}>
              <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#FE871E"}}/>
              <span style={{fontSize:"11px",fontWeight:600,color:"#FE871E",letterSpacing:".14em",textTransform:"uppercase"}}>{t.heroBadge}</span>
            </div>
            <h1 style={{fontFamily:"'PT Serif Caption',serif",fontSize:"clamp(32px,4vw,54px)",fontWeight:400,color:"#fff",lineHeight:1.18,letterSpacing:"-.02em",marginBottom:"20px"}}>
              {t.heroTitle1}<br/>
              <span style={{color:"rgba(255,255,255,.55)"}}>{t.heroThrough}</span> {t.heroTitle2}
            </h1>
            <p style={{fontSize:"17px",fontWeight:400,color:"rgba(255,255,255,.6)",lineHeight:1.75,maxWidth:"440px",marginBottom:"36px"}}>{t.heroDesc}</p>
            <div style={{display:"flex",gap:"14px",flexWrap:"wrap",flexDirection:isRtl?"row-reverse":"row",justifyContent:isRtl?"flex-end":"flex-start"}}>
              <button onClick={()=>onNavigate("login")}
                style={{padding:"14px 32px",borderRadius:"9px",border:"none",cursor:"pointer",background:"#FE871E",color:"#fff",fontFamily:"'Manrope',sans-serif",fontSize:"15px",fontWeight:600,boxShadow:"0 4px 18px rgba(254,135,30,.4)",transition:"all .18s"}}
                onMouseEnter={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.background="#E87518";b.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.background="#FE871E";b.style.transform="translateY(0)";}}>
                {t.heroGetStarted}
              </button>
              <button onClick={()=>scrollTo("about")}
                style={{padding:"14px 32px",borderRadius:"9px",border:"1.5px solid rgba(255,255,255,.25)",cursor:"pointer",background:"transparent",color:"rgba(255,255,255,.85)",fontFamily:"'Manrope',sans-serif",fontSize:"15px",fontWeight:500,transition:"all .18s"}}
                onMouseEnter={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.borderColor="rgba(255,255,255,.55)";b.style.color="#fff";}}
                onMouseLeave={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.borderColor="rgba(255,255,255,.25)";b.style.color="rgba(255,255,255,.85)";}}>
                {t.heroLearnMore}
              </button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
            {[{n:t.stat1n,l:t.stat1l},{n:t.stat2n,l:t.stat2l},{n:t.stat3n,l:t.stat3l},{n:t.stat4n,l:t.stat4l}].map(({n,l})=>(
              <div key={String(l)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"12px",padding:"24px 20px"}}>
                <div style={{fontFamily:"'PT Serif Caption',serif",fontSize:"32px",fontWeight:400,color:"#fff",marginBottom:"4px"}}>{n}</div>
                <div style={{fontSize:"13px",fontWeight:500,color:"rgba(255,255,255,.5)",letterSpacing:".04em"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{padding:"96px 24px",background:"var(--c-bg)"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"80px",alignItems:"center"}} className="about-grid">
          <div style={{position:"relative"}}>
            <div style={{borderRadius:"16px",overflow:"hidden",background:"linear-gradient(145deg,#071E3D,#054A9E)",height:"360px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 20px 60px rgba(5,74,158,.2)"}}>
              <div style={{textAlign:"center"}}>
                <img src="/src/imports/Create_a_clean__modern__professional_logo_for_a_BT11.png" alt="DTEMS" style={{height:"80px",objectFit:"contain",filter:"brightness(0) invert(1)",marginBottom:"16px"}}/>
                <div style={{fontFamily:"'PT Serif Caption',serif",fontSize:"18px",color:"rgba(255,255,255,.6)"}}>Digital Technical Education<br/>Management System</div>
              </div>
            </div>
            <div style={{position:"absolute",bottom:"-16px",right:"-16px",width:"100px",height:"100px",borderRadius:"12px",background:"#FE871E",opacity:.12}}/>
          </div>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
              <div style={{width:"28px",height:"2px",background:"var(--c-accent)"}}/>
              <span style={{fontSize:"11px",fontWeight:700,color:"var(--c-accent)",letterSpacing:".16em",textTransform:"uppercase"}}>{t.aboutBadge}</span>
            </div>
            <h2 style={{fontFamily:"'PT Serif Caption',serif",fontSize:"clamp(26px,3vw,38px)",fontWeight:400,color:"var(--c-heading)",lineHeight:1.25,marginBottom:"20px"}}>{t.aboutTitle}</h2>
            <p style={{fontSize:"16px",color:"var(--c-text-sub)",lineHeight:1.8,marginBottom:"16px"}}>{t.aboutP1}</p>
            <p style={{fontSize:"16px",color:"var(--c-text-sub)",lineHeight:1.8,marginBottom:"28px"}}>{t.aboutP2}</p>
            <div style={{display:"flex",gap:"24px"}}>
              {[{v:"2019",l:t.aboutFounded},{v:"5",l:t.aboutCurriculum},{v:"ISO",l:t.aboutCertified}].map(({v,l})=>(
                <div key={String(l)}>
                  <div style={{fontSize:"20px",fontWeight:700,color:"var(--c-primary)",marginBottom:"2px"}}>{v}</div>
                  <div style={{fontSize:"12px",color:"var(--c-text-muted)",letterSpacing:".04em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{padding:"96px 24px",background:"var(--c-surface)"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"56px"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
              <div style={{width:"24px",height:"2px",background:"var(--c-accent)"}}/>
              <span style={{fontSize:"11px",fontWeight:700,color:"var(--c-accent)",letterSpacing:".16em",textTransform:"uppercase"}}>{t.servicesBadge}</span>
              <div style={{width:"24px",height:"2px",background:"var(--c-accent)"}}/>
            </div>
            <h2 style={{fontFamily:"'PT Serif Caption',serif",fontSize:"clamp(26px,3vw,38px)",fontWeight:400,color:"var(--c-heading)",lineHeight:1.25}}>{t.servicesTitle}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px"}}>
            {services.map(({icon,title,desc})=>(
              <div key={title}
                style={{background:"var(--c-card)",borderRadius:"14px",padding:"28px 24px",border:"1px solid var(--c-border)",transition:"all .2s",cursor:"default"}}
                onMouseEnter={e=>{const d=e.currentTarget as HTMLDivElement;d.style.boxShadow="0 8px 30px rgba(5,74,158,.1)";d.style.borderColor="var(--c-primary)";d.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{const d=e.currentTarget as HTMLDivElement;d.style.boxShadow="none";d.style.borderColor="var(--c-border)";d.style.transform="translateY(0)";}}>
                <div style={{fontSize:"28px",marginBottom:"14px"}}>{icon}</div>
                <h3 style={{fontSize:"17px",fontWeight:700,color:"var(--c-heading)",marginBottom:"10px"}}>{title}</h3>
                <p style={{fontSize:"14px",color:"var(--c-text-muted)",lineHeight:1.7}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CENTERS ── */}
      <section id="centers" style={{padding:"96px 24px",background:"var(--c-bg)"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"52px"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
              <div style={{width:"24px",height:"2px",background:"var(--c-accent)"}}/>
              <span style={{fontSize:"11px",fontWeight:700,color:"var(--c-accent)",letterSpacing:".16em",textTransform:"uppercase"}}>{t.centersBadge}</span>
              <div style={{width:"24px",height:"2px",background:"var(--c-accent)"}}/>
            </div>
            <h2 style={{fontFamily:"'PT Serif Caption',serif",fontSize:"clamp(26px,3vw,38px)",fontWeight:400,color:"var(--c-heading)",marginBottom:"12px"}}>{t.centersTitle}</h2>
            <p style={{fontSize:"15px",color:"var(--c-text-muted)",maxWidth:"480px",margin:"0 auto"}}>{t.centersDesc}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"14px"}}>
            {centers.map((c,i)=>(
              <div key={c} style={{background:i%3===0?"var(--c-primary)":"var(--c-surface)",borderRadius:"12px",padding:"20px 18px",border:"1px solid",borderColor:i%3===0?"transparent":"var(--c-border)",display:"flex",alignItems:"center",gap:"12px",transition:"all .18s"}}
                onMouseEnter={e=>{const d=e.currentTarget as HTMLDivElement;if(i%3!==0){d.style.background="var(--c-card)";d.style.borderColor="var(--c-primary)";}}}
                onMouseLeave={e=>{const d=e.currentTarget as HTMLDivElement;if(i%3!==0){d.style.background="var(--c-surface)";d.style.borderColor="var(--c-border)";}}}
              >
                <div style={{width:"36px",height:"36px",borderRadius:"8px",flexShrink:0,background:i%3===0?"rgba(255,255,255,.15)":"rgba(5,74,158,.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={i%3===0?"#fff":"var(--c-primary)"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <span style={{fontSize:"14px",fontWeight:600,color:i%3===0?"#fff":"var(--c-text)"}}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHOOLS (always dark bg) ── */}
      <section id="schools" style={{padding:"96px 24px",background:"#071E3D"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"52px"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
              <div style={{width:"24px",height:"2px",background:"#FE871E"}}/>
              <span style={{fontSize:"11px",fontWeight:700,color:"#FE871E",letterSpacing:".16em",textTransform:"uppercase"}}>{t.schoolsBadge}</span>
              <div style={{width:"24px",height:"2px",background:"#FE871E"}}/>
            </div>
            <h2 style={{fontFamily:"'PT Serif Caption',serif",fontSize:"clamp(26px,3vw,38px)",fontWeight:400,color:"#fff",marginBottom:"12px"}}>{t.schoolsTitle}</h2>
            <p style={{fontSize:"15px",color:"rgba(255,255,255,.5)",maxWidth:"440px",margin:"0 auto"}}>{t.schoolsDesc}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"12px"}}>
            {schools.map(s=>(
              <div key={s} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"10px",padding:"18px 16px",textAlign:"center",transition:"all .18s"}}
                onMouseEnter={e=>{const d=e.currentTarget as HTMLDivElement;d.style.background="rgba(255,255,255,.09)";d.style.borderColor="rgba(254,135,30,.3)";}}
                onMouseLeave={e=>{const d=e.currentTarget as HTMLDivElement;d.style.background="rgba(255,255,255,.05)";d.style.borderColor="rgba(255,255,255,.08)";}}>
                <div style={{width:"40px",height:"40px",borderRadius:"10px",background:"rgba(5,74,158,.4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <p style={{fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.75)",lineHeight:1.4}}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER (always dark) ── */}
      <footer style={{background:"#040D1A",padding:"48px 24px 28px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"32px",marginBottom:"40px",flexDirection:isRtl?"row-reverse":"row"}}>
            <div>
              <img src="/src/imports/Create_a_clean__modern__professional_logo_for_a_BT11.png" alt="DTEMS" style={{height:"44px",objectFit:"contain",filter:"brightness(0) invert(1)",opacity:.8,marginBottom:"12px"}}/>
              <p style={{fontSize:"12px",color:"rgba(255,255,255,.35)",maxWidth:"240px",lineHeight:1.7}}>{t.footerDesc}</p>
            </div>
            <div style={{display:"flex",gap:"48px",flexWrap:"wrap"}}>
              {[[t.footerPlatform, t.footerLinks1],[t.footerAccount, t.footerLinks2]].map(([heading,links])=>(
                <div key={String(heading)}>
                  <p style={{fontSize:"11px",fontWeight:700,color:"rgba(255,255,255,.5)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:"14px"}}>{String(heading)}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                    {(links as unknown as string[]).map(l=>(
                      <a key={l} href="#" style={{fontSize:"14px",color:"rgba(255,255,255,.4)",textDecoration:"none",transition:"color .15s"}}
                        onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="#fff")}
                        onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.4)")}>{l}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.25)"}}>{t.footerRights}</p>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.2)"}}>Digital Technical Education Management System</p>
          </div>
        </div>
      </footer>

      <style>{`
        @media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}.about-grid{grid-template-columns:1fr!important}}
        [data-theme="dark"] select option{background:#15181C;color:#F8FAFC;}
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════════════════════════════ */
function LoginPage({onNavigate}:{onNavigate:(p:Page)=>void}){
  const {lang}=useApp();
  const t=I18N[lang] as T;
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPwd,setShowPwd]=useState(false);
  const [focused,setFocused]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [rememberMe,setRememberMe]=useState(false);
  const [emailTouched,setEmailTouched]=useState(false);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);

  const emailErr=emailTouched&&email&&!isValidEmail(email)?t.errInvalidEmail:undefined;

  const submit=(e:React.FormEvent)=>{
    e.preventDefault();if(loading)return;setError("");setEmailTouched(true);
    if(!email||!password){setError(t.errFillAll);return;}
    if(!isValidEmail(email)){setError(t.errInvalidEmail);return;}
    setLoading(true);
    timer.current=setTimeout(()=>{setLoading(false);setError(t.errInvalidCreds);},2000);
  };

  return(
    <LoginShell>
      <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"28px",fontWeight:700,color:"var(--c-heading-auth)",marginBottom:"8px"}}>{t.loginTitle}</h2>
      <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"17px",color:"var(--c-text-muted)",marginBottom:"28px"}}>{t.loginSubtitle}</p>
      <form onSubmit={submit} noValidate>
        <div style={{marginBottom:"6px"}}>
          <Lbl>{t.loginEmail}</Lbl>
          <TxtInput value={email} onChange={v=>{setEmail(v);setError("");}} placeholder="you@example.com" type="email" autoComplete="email"
            focused={focused==="email"} onFocus={()=>setFocused("email")}
            onBlur={()=>{setFocused(null);setEmailTouched(true);}}
            hasErr={!!emailErr}/>
        </div>
        {emailErr?<div style={{marginBottom:"14px"}}><FErr msg={emailErr}/></div>:<div style={{marginBottom:"16px"}}/>}
        <div style={{marginBottom:"10px"}}>
          <Lbl>{t.loginPwd}</Lbl>
          <PwdInput value={password} onChange={v=>{setPassword(v);setError("");}} show={showPwd} onToggle={()=>setShowPwd(!showPwd)} focused={focused==="pwd"} onFocus={()=>setFocused("pwd")} onBlur={()=>setFocused(null)} placeholder="••••••••"/>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"28px"}}>
          <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",userSelect:"none"}}>
            <div onClick={()=>setRememberMe(r=>!r)} style={{
              width:"18px",height:"18px",borderRadius:"5px",flexShrink:0,
              border:`2px solid ${rememberMe?"var(--c-primary)":"var(--c-border)"}`,
              background:rememberMe?"var(--c-primary)":"transparent",
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all .15s ease",cursor:"pointer",
            }}>
              {rememberMe&&<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"15px",fontWeight:500,color:"var(--c-text)"}}>{t.loginRemember}</span>
          </label>
          <a href="#" onClick={e=>{e.preventDefault();onNavigate("forgot-password");}}
            style={{fontFamily:"'Manrope',sans-serif",fontSize:"15px",fontWeight:500,color:"var(--c-primary)",textDecoration:"none"}}
            onMouseEnter={e=>((e.currentTarget as HTMLElement).style.opacity=".7")}
            onMouseLeave={e=>((e.currentTarget as HTMLElement).style.opacity="1")}>{t.loginForgot}</a>
        </div>
        {error&&(
          <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"10px 12px",borderRadius:"7px",background:"rgba(192,57,43,.07)",border:"1px solid rgba(192,57,43,.18)",marginBottom:"14px"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"15px",fontWeight:500,color:"#C0392B"}}>{error}</span>
          </div>
        )}
        <SubmitBtn loading={loading} label={t.loginBtn} loadingLabel={t.loginBtnLoading}/>
      </form>
      <div style={{marginTop:"20px",textAlign:"center"}}>
        <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"16px",color:"var(--c-text-muted)"}}>{t.loginNoAccount}</span>
        <NavLink2 onClick={()=>onNavigate("register-student")}>{t.loginRegister}</NavLink2>
      </div>
      <div style={{marginTop:"14px",textAlign:"center"}}>
        <NavLink2 onClick={()=>onNavigate("home")}>{t.loginBackHome}</NavLink2>
      </div>
    </LoginShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STUDENT REGISTER PAGE
═══════════════════════════════════════════════════════════════════════════ */
type SRF={
  firstName:string;middleName:string;lastName:string;
  level:string;institution:string;
  email:string;parentEmail:string;
  countryCode:string;phone:string;
  password:string;confirm:string;
  terms:boolean;
};
type SRE=Partial<Record<keyof SRF,string>>;
type RegStep="form"|"otp";

function StudentRegisterPage({onNavigate}:{onNavigate:(p:Page)=>void}){
  const {lang}=useApp();
  const t=I18N[lang] as T;
  const [step,setStep]=useState<RegStep>("form");
  const [f,setF]=useState<SRF>({
    firstName:"",middleName:"",lastName:"",
    level:"",institution:"",
    email:"",parentEmail:"",
    countryCode:"+962",phone:"",
    password:"",confirm:"",
    terms:false,
  });
  const [showPwd,setShowPwd]=useState(false);
  const [showConf,setShowConf]=useState(false);
  const [focused,setFocused]=useState<string|null>(null);
  const [errors,setErrors]=useState<SRE>({});
  const [touched,setTouched]=useState<Set<string>>(new Set());
  const [loading,setLoading]=useState(false);
  const [otp,setOtp]=useState("");
  const [otpLoading,setOtpLoading]=useState(false);
  const [otpErr,setOtpErr]=useState("");
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);

  const set=(k:keyof SRF,v:string|boolean)=>{setF(x=>({...x,[k]:v}));setErrors(e=>({...e,[k]:undefined}));};
  const touch=(k:string)=>setTouched(s=>{const n=new Set(s);n.add(k);return n;});

  const pwdReady=allRulesMet(f.password);
  const eStatus=emailStatus(f.email);
  const parentEmailValid=!f.parentEmail||isValidEmail(f.parentEmail);
  const confirmMismatch=!!f.confirm&&f.password!==f.confirm;
  const requiredDigits=phoneDigitsFor(f.countryCode);
  const phoneDigitsOnly=f.phone.replace(/\D/g,"");
  const phoneValid=phoneDigitsOnly.length===requiredDigits;

  const validate=():SRE=>{
    const e:SRE={};
    if(!f.firstName.trim()) e.firstName=t.errRequired;
    if(!f.lastName.trim())  e.lastName=t.errRequired;
    if(!f.level)            e.level=t.errSelectLevel;
    if(!f.institution.trim()) e.institution=t.errInstitutionReq;
    if(!f.email.trim())     e.email=t.errEmailReq;
    else if(eStatus==="invalid") e.email=t.errInvalidEmail;
    else if(eStatus==="taken")   e.email=t.errEmailTaken;
    if(f.parentEmail&&!parentEmailValid) e.parentEmail=t.errParentEmail;
    if(!f.phone.trim()) e.phone=t.errPhoneReq;
    else if(!phoneValid) e.phone=(t.errPhoneDigits as string).replace("{n}",String(requiredDigits)).replace("{code}",f.countryCode);
    if(!f.password)    e.password=t.errPwdReq;
    else if(!pwdReady) e.password=t.errPwdRules;
    if(!f.confirm)          e.confirm=t.errConfirmReq;
    else if(confirmMismatch) e.confirm=t.errConfirmMismatch;
    if(!f.terms) e.terms=t.errTerms;
    return e;
  };

  const submit=(e:React.FormEvent)=>{
    e.preventDefault();if(loading)return;
    setTouched(new Set(["firstName","lastName","level","institution","email","parentEmail","phone","password","confirm","terms"]));
    const errs=validate();
    if(Object.keys(errs).length>0){setErrors(errs);return;}
    setLoading(true);
    timer.current=setTimeout(()=>{setLoading(false);setStep("otp");},1500);
  };

  const submitOtp=(e:React.FormEvent)=>{
    e.preventDefault();if(otpLoading)return;
    setOtpLoading(true);
    timer.current=setTimeout(()=>{
      setOtpLoading(false);
      if(otp===MOCK_OTP){onNavigate("login");}
      else{setOtpErr("Incorrect code. Please check and try again.");}
    },1200);
  };

  const backBtnStyle:React.CSSProperties={display:"inline-flex",alignItems:"center",gap:"6px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:600,color:"var(--c-text-muted)",padding:"0",marginBottom:"24px",transition:"color .15s"};

  /* ── OTP Step ── */
  if(step==="otp"){
    return(
      <RegisterShell>
        <div style={{marginBottom:"32px"}}>
          <button onClick={()=>{setStep("form");setOtp("");setOtpErr("");}} type="button" style={backBtnStyle}
            onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--c-primary)")}
            onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="var(--c-text-muted)")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            {t.otpChangeEmail}
          </button>
          <h1 style={{fontFamily:"'Manrope',sans-serif",fontSize:"28px",fontWeight:700,color:"var(--c-heading-auth)",marginBottom:"10px"}}>{t.otpTitle}</h1>
          <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"16px",color:"var(--c-text-muted)",lineHeight:1.6}}>
            {t.otpSentTo} <strong style={{color:"var(--c-primary)"}}>{f.email}</strong>{t.otpSentTo2}
          </p>
        </div>

        <div style={{background:"var(--c-card)",borderRadius:"16px",padding:"32px",border:"1px solid var(--c-border)",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          <form onSubmit={submitOtp} noValidate style={{display:"flex",flexDirection:"column",gap:"24px"}}>
            <div>
              <Lbl t={t}>{t.otpLabel}</Lbl>
              <input type="text" inputMode="numeric" maxLength={6} value={otp}
                onChange={e=>{setOtp(e.target.value.replace(/\D/g,""));setOtpErr("");}}
                placeholder="123456" autoFocus
                style={{...baseInput,fontSize:"28px",fontWeight:700,letterSpacing:"10px",textAlign:"center",color:"var(--c-primary)",...(focused==="otp"?focusCss:{}),...(otpErr?errCss:{})}}
                onFocus={()=>setFocused("otp")} onBlur={()=>setFocused(null)}/>
              {otpErr&&(
                <div style={{marginTop:"8px",display:"flex",alignItems:"center",gap:"7px"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:500,color:"#C0392B",margin:0}}>{otpErr}</p>
                </div>
              )}
            </div>
            <SubmitBtn loading={otpLoading} disabled={otp.length!==6} label={t.otpVerifyBtn} loadingLabel={t.otpVerifyingBtn}/>
            <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",color:"var(--c-text-muted)",textAlign:"center",margin:0}}>
              {t.otpResend}{" "}
              <a href="#" style={{color:"var(--c-primary)",fontWeight:600,textDecoration:"none"}} onClick={e=>e.preventDefault()}>{t.otpResendLink}</a>
            </p>
          </form>
        </div>
      </RegisterShell>
    );
  }

  /* ── Form Step ── */
  return(
    <RegisterShell>
      <div style={{marginBottom:"32px"}}>
        <button onClick={()=>onNavigate("login")} type="button" style={backBtnStyle}
          onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--c-primary)")}
          onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="var(--c-text-muted)")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          {t.regBackLogin}
        </button>
        <h1 style={{fontFamily:"'Manrope',sans-serif",fontSize:"30px",fontWeight:700,color:"var(--c-heading-auth)",marginBottom:"10px"}}>{t.regTitle}</h1>
        <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"17px",color:"var(--c-text-muted)",lineHeight:1.6}}>{t.regSubtitle}</p>
      </div>

      <form onSubmit={submit} noValidate style={{display:"flex",flexDirection:"column",gap:"32px"}}>

        {/* Section 1: Personal */}
        <div style={{background:"var(--c-card)",borderRadius:"16px",padding:"32px",border:"1px solid var(--c-border)",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          <SectionHeading number="1" title={t.regSec1}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"24px"}}>
            <div>
              <Lbl t={t}>{t.regFirstName} <span style={{color:"#C0392B"}}>*</span></Lbl>
              <TxtInput value={f.firstName} onChange={v=>set("firstName",v)} placeholder={t.regFirstName}
                focused={focused==="fn"} onFocus={()=>setFocused("fn")}
                onBlur={()=>{setFocused(null);touch("firstName");}}
                hasErr={!!(errors.firstName||(touched.has("firstName")&&!f.firstName.trim()))}/>
              <FErr msg={errors.firstName||(touched.has("firstName")&&!f.firstName.trim()?t.errRequired:undefined)}/>
            </div>
            <div>
              <Lbl t={t}>{t.regLastName} <span style={{color:"#C0392B"}}>*</span></Lbl>
              <TxtInput value={f.lastName} onChange={v=>set("lastName",v)} placeholder={t.regLastName}
                focused={focused==="ln"} onFocus={()=>setFocused("ln")}
                onBlur={()=>{setFocused(null);touch("lastName");}}
                hasErr={!!(errors.lastName||(touched.has("lastName")&&!f.lastName.trim()))}/>
              <FErr msg={errors.lastName||(touched.has("lastName")&&!f.lastName.trim()?t.errRequired:undefined)}/>
            </div>
          </div>
          <div style={{marginBottom:"24px"}}>
            <Lbl optional t={t}>{t.regMiddleName}</Lbl>
            <TxtInput value={f.middleName} onChange={v=>set("middleName",v)} placeholder={t.regMiddleName}
              focused={focused==="mn"} onFocus={()=>setFocused("mn")} onBlur={()=>setFocused(null)}/>
          </div>
        </div>

        {/* Section 2: Academic */}
        <div style={{background:"var(--c-card)",borderRadius:"16px",padding:"32px",border:"1px solid var(--c-border)",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          <SectionHeading number="2" title={t.regSec2}/>
          <div style={{marginBottom:"24px"}}>
            <Lbl t={t}>{t.regLevel} <span style={{color:"#C0392B"}}>*</span></Lbl>
            <div style={{position:"relative"}}>
              <select value={f.level} onChange={e=>set("level",e.target.value)}
                onFocus={()=>setFocused("level")} onBlur={()=>setFocused(null)}
                style={{...baseInputIcon,appearance:"none" as never,cursor:"pointer",color:f.level?"var(--c-text)":"var(--c-text-muted)",...(focused==="level"?focusCss:{}),...(errors.level?errCss:{})}}>
                <option value="" disabled>{t.regLevelPh}</option>
                {["Level 2","Level 3","Level 4","Level 5"].map(lv=>(
                  <option key={lv} value={lv}>{lv}</option>
                ))}
              </select>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            <FErr msg={errors.level}/>
          </div>
          <div>
            <Lbl t={t}>{t.regInstitution} <span style={{color:"#C0392B"}}>*</span></Lbl>
            <TxtInput value={f.institution} onChange={v=>set("institution",v)} placeholder={t.regInstitutionPh}
              focused={focused==="inst"} onFocus={()=>setFocused("inst")}
              onBlur={()=>{setFocused(null);touch("institution");}}
              hasErr={!!(errors.institution||(touched.has("institution")&&!f.institution.trim()))}/>
            <FErr msg={errors.institution||(touched.has("institution")&&!f.institution.trim()?t.errInstitutionReq:undefined)}/>
          </div>
        </div>

        {/* Section 3: Account */}
        <div style={{background:"var(--c-card)",borderRadius:"16px",padding:"32px",border:"1px solid var(--c-border)",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          <SectionHeading number="3" title={t.regSec3}/>

          {/* Student Email */}
          <div style={{marginBottom:"24px"}}>
            <Lbl t={t}>{t.regStudentEmail} <span style={{color:"#C0392B"}}>*</span></Lbl>
            <TxtInput value={f.email} onChange={v=>set("email",v)} placeholder="you@example.com" type="email"
              focused={focused==="email"} onFocus={()=>setFocused("email")}
              onBlur={()=>{setFocused(null);touch("email");}}
              hasErr={eStatus==="taken"||(!!f.email&&eStatus==="invalid")}/>
            {eStatus!=="invalid"
              ?<EmailFeedback email={f.email} onGoLogin={()=>onNavigate("login")} t={t}/>
              :f.email
                ?<FErr msg={t.emailValidFmt}/>
                :<FErr msg={touched.has("email")?t.errEmailReq:undefined}/>
            }
          </div>

          {/* Parent Email */}
          <div style={{marginBottom:"24px"}}>
            <Lbl optional t={t}>{t.regParentEmail}</Lbl>
            <TxtInput value={f.parentEmail} onChange={v=>set("parentEmail",v)} placeholder="parent@example.com" type="email"
              focused={focused==="pe"} onFocus={()=>setFocused("pe")}
              onBlur={()=>{setFocused(null);touch("parentEmail");}}
              hasErr={!!(errors.parentEmail||(touched.has("parentEmail")&&f.parentEmail&&!parentEmailValid))}/>
            <FErr msg={errors.parentEmail||(touched.has("parentEmail")&&f.parentEmail&&!parentEmailValid?t.errParentEmail:undefined)}/>
          </div>

          {/* Phone */}
          <div style={{marginBottom:"24px"}}>
            <Lbl t={t}>{t.regPhone} <span style={{color:"#C0392B"}}>*</span></Lbl>
            <PhoneInput
              countryCode={f.countryCode} onCodeChange={v=>set("countryCode",v)}
              phone={f.phone} onPhoneChange={v=>set("phone",v)}
              focusedCode={focused==="pcode"} focusedNum={focused==="pnum"}
              onFocusCode={()=>setFocused("pcode")} onFocusNum={()=>setFocused("pnum")}
              onBlurCode={()=>{setFocused(null);touch("phone");}}
              onBlurNum={()=>{setFocused(null);touch("phone");}}
              hasErr={!!(errors.phone||(touched.has("phone")&&!f.phone.trim()))}/>
            {f.phone&&!errors.phone&&(
              <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"6px"}}>
                {phoneValid
                  ?<><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"13px",color:"#16A34A",fontWeight:500}}>{t.phoneValidLabel}</span></>
                  :<span style={{fontFamily:"'Manrope',sans-serif",fontSize:"13px",color:"var(--c-text-muted)",fontWeight:500}}>
                    {(t.phoneDigitsOf as string).replace("{n}",String(phoneDigitsOnly.length)).replace("{total}",String(requiredDigits))}
                  </span>
                }
              </div>
            )}
            <FErr msg={errors.phone||(touched.has("phone")&&!f.phone.trim()?t.errPhoneReq:undefined)}/>
          </div>

          {/* Password */}
          <div style={{marginBottom:"24px"}}>
            <Lbl t={t}>{t.regPwd} <span style={{color:"#C0392B"}}>*</span></Lbl>
            <PwdInput value={f.password} onChange={v=>set("password",v)} show={showPwd} onToggle={()=>setShowPwd(!showPwd)}
              focused={focused==="pwd"} onFocus={()=>setFocused("pwd")} onBlur={()=>setFocused(null)}
              placeholder="••••••••" hasErr={!!errors.password}/>
            <PwdBar password={f.password} t={t}/>
            <PwdRules password={f.password} t={t}/>
          </div>

          {/* Confirm Password */}
          <div>
            <Lbl t={t}>{t.regConfirmPwd} <span style={{color:"#C0392B"}}>*</span></Lbl>
            <PwdInput value={f.confirm} onChange={v=>set("confirm",v)} show={showConf} onToggle={()=>setShowConf(!showConf)}
              focused={focused==="conf"} onFocus={()=>setFocused("conf")} onBlur={()=>setFocused(null)}
              placeholder="••••••••" hasErr={confirmMismatch||!!errors.confirm}/>
            {f.confirm&&f.password&&!confirmMismatch&&(
              <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"8px"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:600,color:"#15803D"}}>{t.pwdsMatch}</span>
              </div>
            )}
            {confirmMismatch&&<FErr msg={t.errConfirmMismatch}/>}
            {!confirmMismatch&&errors.confirm&&<FErr msg={errors.confirm}/>}
          </div>
        </div>

        {/* Terms + Submit */}
        <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
          <TermsCheck checked={f.terms} onChange={v=>set("terms",v)} error={errors.terms} t={t}/>
          <SubmitBtn loading={loading} disabled={!pwdReady&&!!f.password} label={t.regCreateBtn} loadingLabel={t.regCreatingBtn}/>
          {!pwdReady&&f.password&&(
            <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",color:"var(--c-text-muted)",textAlign:"center",margin:0}}>{t.completeReqs}</p>
          )}
          <div style={{textAlign:"center"}}>
            <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"16px",color:"var(--c-text-muted)"}}>{t.regHaveAccount}</span>
            <NavLink2 onClick={()=>onNavigate("login")}>{t.regSignIn}</NavLink2>
          </div>
        </div>
      </form>
    </RegisterShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FORGOT PASSWORD PAGE
═══════════════════════════════════════════════════════════════════════════ */
type FPStep = "email" | "otp" | "newpwd" | "done";

function ForgotPasswordPage({onNavigate}:{onNavigate:(p:Page)=>void}){
  const {lang}=useApp();
  const t=I18N[lang] as T;
  const [step,setStep]=useState<FPStep>("email");
  const [email,setEmail]=useState("");
  const [emailTouched,setEmailTouched]=useState(false);
  const [emailLoading,setEmailLoading]=useState(false);
  const [otp,setOtp]=useState("");
  const [otpErr,setOtpErr]=useState("");
  const [otpLoading,setOtpLoading]=useState(false);
  const [pwd,setPwd]=useState("");
  const [confirm,setConfirm]=useState("");
  const [showPwd,setShowPwd]=useState(false);
  const [showConf,setShowConf]=useState(false);
  const [focused,setFocused]=useState<string|null>(null);
  const [resetLoading,setResetLoading]=useState(false);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);

  const emailErr=emailTouched&&email&&!isValidEmail(email)?t.errInvalidEmail:undefined;
  const pwdReady=allRulesMet(pwd);
  const confirmMismatch=!!confirm&&pwd!==confirm;

  const submitEmail=(e:React.FormEvent)=>{
    e.preventDefault();setEmailTouched(true);
    if(!isValidEmail(email)) return;
    setEmailLoading(true);
    timer.current=setTimeout(()=>{setEmailLoading(false);setStep("otp");},1400);
  };

  const submitOtp=(e:React.FormEvent)=>{
    e.preventDefault();if(otpLoading) return;
    setOtpLoading(true);
    timer.current=setTimeout(()=>{
      setOtpLoading(false);
      if(otp===MOCK_OTP){setStep("newpwd");}
      else{setOtpErr("Incorrect code. Please try again.");}
    },1200);
  };

  const submitNewPwd=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!pwdReady||confirmMismatch||!confirm) return;
    setResetLoading(true);
    timer.current=setTimeout(()=>{setResetLoading(false);setStep("done");},1400);
  };

  const backBtnStyle:React.CSSProperties={display:"inline-flex",alignItems:"center",gap:"6px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:600,color:"var(--c-text-muted)",padding:"0",marginBottom:"24px",transition:"color .15s"};

  /* ── Step: enter email ── */
  if(step==="email") return(
    <LoginShell>
      <button onClick={()=>onNavigate("login")} type="button" style={{...backBtnStyle,marginBottom:"20px"}}
        onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--c-primary)")}
        onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="var(--c-text-muted)")}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        {t.fpBackLogin}
      </button>
      {/* icon */}
      <div style={{width:"56px",height:"56px",borderRadius:"14px",background:"rgba(97,166,250,.1)",border:"1px solid rgba(97,166,250,.2)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20px"}}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
      </div>
      <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"26px",fontWeight:700,color:"var(--c-heading-auth)",marginBottom:"8px"}}>{t.fpTitle}</h2>
      <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"16px",color:"var(--c-text-muted)",marginBottom:"28px",lineHeight:1.6}}>{t.fpSubtitle}</p>
      <form onSubmit={submitEmail} noValidate>
        <div style={{marginBottom:"6px"}}>
          <Lbl t={t}>{t.fpEmailLabel}</Lbl>
          <TxtInput value={email} onChange={v=>{setEmail(v);setEmailTouched(false);}} placeholder="you@example.com" type="email"
            focused={focused==="email"} onFocus={()=>setFocused("email")}
            onBlur={()=>{setFocused(null);setEmailTouched(true);}}
            hasErr={!!emailErr}/>
        </div>
        {emailErr?<div style={{marginBottom:"18px"}}><FErr msg={emailErr}/></div>:<div style={{marginBottom:"24px"}}/>}
        <SubmitBtn loading={emailLoading} label={t.fpSendBtn} loadingLabel={t.fpSendingBtn}/>
      </form>
    </LoginShell>
  );

  /* ── Step: enter OTP ── */
  if(step==="otp") return(
    <LoginShell>
      <button onClick={()=>{setStep("email");setOtp("");setOtpErr("");}} type="button" style={{...backBtnStyle,marginBottom:"20px"}}
        onMouseEnter={e=>((e.currentTarget as HTMLElement).style.color="var(--c-primary)")}
        onMouseLeave={e=>((e.currentTarget as HTMLElement).style.color="var(--c-text-muted)")}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        {t.fpChangeEmail}
      </button>
      <div style={{width:"56px",height:"56px",borderRadius:"14px",background:"rgba(22,163,74,.08)",border:"1px solid rgba(22,163,74,.2)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20px"}}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"26px",fontWeight:700,color:"var(--c-heading-auth)",marginBottom:"8px"}}>{t.fpOtpTitle}</h2>
      <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"16px",color:"var(--c-text-muted)",marginBottom:"28px",lineHeight:1.6}}>
        {t.fpOtpSubtitle} <strong style={{color:"var(--c-primary)"}}>{email}</strong>{t.fpOtpSubtitle2}
      </p>
      <form onSubmit={submitOtp} noValidate style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <div>
          <Lbl t={t}>{t.otpLabel}</Lbl>
          <input type="text" inputMode="numeric" maxLength={6} value={otp}
            onChange={e=>{setOtp(e.target.value.replace(/\D/g,""));setOtpErr("");}}
            placeholder="123456" autoFocus
            style={{...baseInput,fontSize:"28px",fontWeight:700,letterSpacing:"10px",textAlign:"center",color:"var(--c-primary)",...(focused==="otp"?focusCss:{}),...(otpErr?errCss:{})}}
            onFocus={()=>setFocused("otp")} onBlur={()=>setFocused(null)}/>
          {otpErr&&(
            <div style={{marginTop:"8px",display:"flex",alignItems:"center",gap:"7px"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:500,color:"#C0392B",margin:0}}>{otpErr}</p>
            </div>
          )}
        </div>
        <SubmitBtn loading={otpLoading} disabled={otp.length!==6} label={t.otpVerifyBtn} loadingLabel={t.otpVerifyingBtn}/>
        <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",color:"var(--c-text-muted)",textAlign:"center",margin:0}}>
          {t.otpResend}{" "}
          <a href="#" style={{color:"var(--c-primary)",fontWeight:600,textDecoration:"none"}} onClick={e=>e.preventDefault()}>{t.otpResendLink}</a>
        </p>
      </form>
    </LoginShell>
  );

  /* ── Step: new password ── */
  if(step==="newpwd") return(
    <LoginShell>
      <div style={{width:"56px",height:"56px",borderRadius:"14px",background:"rgba(254,158,71,.1)",border:"1px solid rgba(254,158,71,.25)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20px"}}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"26px",fontWeight:700,color:"var(--c-heading-auth)",marginBottom:"8px"}}>{t.fpNewPwdTitle}</h2>
      <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"16px",color:"var(--c-text-muted)",marginBottom:"28px",lineHeight:1.6}}>{t.fpNewPwdSubtitle}</p>
      <form onSubmit={submitNewPwd} noValidate style={{display:"flex",flexDirection:"column",gap:"0"}}>
        <div style={{marginBottom:"20px"}}>
          <Lbl t={t}>{t.fpNewPwd}</Lbl>
          <PwdInput value={pwd} onChange={setPwd} show={showPwd} onToggle={()=>setShowPwd(s=>!s)}
            focused={focused==="pwd"} onFocus={()=>setFocused("pwd")} onBlur={()=>setFocused(null)}
            placeholder="••••••••"/>
          <PwdBar password={pwd} t={t}/>
          <PwdRules password={pwd} t={t}/>
        </div>
        <div style={{marginBottom:"24px"}}>
          <Lbl t={t}>{t.fpConfirmPwd}</Lbl>
          <PwdInput value={confirm} onChange={setConfirm} show={showConf} onToggle={()=>setShowConf(s=>!s)}
            focused={focused==="conf"} onFocus={()=>setFocused("conf")} onBlur={()=>setFocused(null)}
            placeholder="••••••••" hasErr={confirmMismatch}/>
          {confirm&&pwd&&!confirmMismatch&&(
            <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"8px"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"14px",fontWeight:600,color:"#15803D"}}>{t.pwdsMatch}</span>
            </div>
          )}
          {confirmMismatch&&<FErr msg={t.errConfirmMismatch}/>}
        </div>
        <SubmitBtn loading={resetLoading} disabled={!pwdReady||!confirm||confirmMismatch} label={t.fpResetBtn} loadingLabel={t.fpResettingBtn}/>
      </form>
    </LoginShell>
  );

  /* ── Step: done ── */
  return(
    <LoginShell>
      <div style={{textAlign:"center",padding:"16px 0 8px"}}>
        <div style={{width:"72px",height:"72px",borderRadius:"50%",background:"rgba(22,163,74,.1)",border:"2px solid #16A34A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:"26px",fontWeight:700,color:"var(--c-heading-auth)",marginBottom:"10px"}}>{t.fpSuccessTitle}</h2>
        <p style={{fontFamily:"'Manrope',sans-serif",fontSize:"16px",color:"var(--c-text-muted)",lineHeight:1.6,marginBottom:"32px"}}>{t.fpSuccessSubtitle}</p>
        <button onClick={()=>onNavigate("login")}
          style={{width:"100%",padding:"17px",borderRadius:"10px",border:"none",cursor:"pointer",background:"var(--c-primary)",color:"#fff",fontFamily:"'Manrope',sans-serif",fontSize:"18px",fontWeight:700,transition:"all .2s",boxShadow:"0 4px 14px rgba(5,74,158,.3)"}}
          onMouseEnter={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.background="var(--c-primary-hov)";b.style.transform="translateY(-1px)";}}
          onMouseLeave={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.background="var(--c-primary)";b.style.transform="translateY(0)";}}>
          {t.loginBtn}
        </button>
      </div>
    </LoginShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function App(){
  const [page,setPage]=useState<Page>("home");
  const [lang,setLang]=useState<Lang>("en");
  const [theme,setTheme]=useState<Theme>("light");

  return(
    <AppCtx.Provider value={{lang,setLang,theme,setTheme}}>
      <div data-theme={theme} dir={lang==="ar"?"rtl":"ltr"} style={{minHeight:"100dvh"}}>
        {(page==="login"||page==="register-student"||page==="forgot-password")?(
          <div style={{display:"flex",width:"100%",minHeight:"100dvh"}}>
            <VisualPanel/>
            {page==="login"&&<LoginPage onNavigate={setPage}/>}
            {page==="register-student"&&<StudentRegisterPage onNavigate={setPage}/>}
            {page==="forgot-password"&&<ForgotPasswordPage onNavigate={setPage}/>}
          </div>
        ):(
          <LandingPage onNavigate={setPage}/>
        )}
      </div>
    </AppCtx.Provider>
  );
}
