import { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Check,
  ChevronDown,
  ClipboardCheck,
  ClipboardPenLine,
  FileCheck2,
  Headset,
  ImagePlus,
  Infinity,
  LockKeyhole,
  Map,
  Menu,
  MonitorPlay,
  Play,
  QrCode,
  RefreshCcw,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import {
  getGetAdminSummaryQueryKey,
  getListAdminOrdersQueryKey,
  useAdminLogin,
  useAdminLogout,
  useCreateAdminPost,
  useCreateRegistration,
  useDeleteAdminPost,
  useGetAdminSession,
  useGetPublishedPost,
  useGetAdminSummary,
  useListAdminPosts,
  useListAdminOrders,
  useListPublishedPosts,
  useLoginStudent,
  useRequestAdminUploadUrl,
  useRequestPasswordReset,
  useUpdateAdminPost,
  useReviewAdminOrder,
  getGetAdminSessionQueryKey,
  getGetPublishedPostQueryKey,
  getListAdminPostsQueryKey,
} from '@workspace/api-client-react';
import type { Post, PostInput } from '@workspace/api-client-react';
import { Link, Redirect, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import type { ReactNode } from 'react';
import './index.css';

const queryClient = new QueryClient();

const assets = {
  logo: '/assets/Logo_1787988875342.png',
  hero: '/assets/Section_1a_1787988875343.png',
  classOne: '/assets/Section_1b_1787988875344.jpg',
  classTwo: '/assets/Section_1c_1787988875344.jpg',
  teacher: '/assets/Section_2_character_no_bg.png',
  groupOne: '/assets/Section_6a_1787988875345.png',
  groupTwo: '/assets/Section_6b_1787988875346.jpg',
  groupThree: '/assets/Section_6c_1787988875346.jpg',
  groupFour: '/assets/Section_6d_1787988875347.jpg',
  groupFive: '/assets/Section_6e_1788702009814.jpg',
  qr: '/assets/QR_code_Thanh_Toán_1787988875343.png',
};

const goToPayment = () => document.getElementById('thanh-toan')?.scrollIntoView({ behavior: 'smooth' });

function Logo() {
  return <img data-testid="img-logo" className="nav-logo" src={assets.logo} alt="Diện Chẩn Boutique" />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Điều hướng chính">
        <div className={`nav-links ${open ? 'open' : ''}`}>
          <a data-testid="link-course" href="#lo-trinh" onClick={() => setOpen(false)}>Khóa học Diện Chẩn</a>
          <Link data-testid="link-news" href="/tin-tuc" onClick={() => setOpen(false)}>Tin tức</Link>
          <Link data-testid="link-contact" href="/lien-he" onClick={() => setOpen(false)}>Liên Hệ</Link>
        </div>
        <button data-testid="button-mobile-menu" className="mobile-menu" onClick={() => setOpen((value) => !value)} aria-label="Mở điều hướng">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
    </div>
  );
}

function SectionLabel(_props: { number: string; children: string }) {
  return null;
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="reveal">
          <div className="eyebrow">KHÓA HỌC DIỆN CHẨN ONLINE</div>
          <h1 id="hero-title">CHỈ VỚI 15 PHÚT <span>MỖI NGÀY</span> THÔNG THẠO NHIỀU TUYỆT CHIÊU!</h1>
          <p className="hero-lead">Giải Pháp Chăm Sóc Sức Khỏe Tự Nhiên Dành Cho Người Bận Rộn</p>
          <p className="hero-description">Khóa học như một “chìa khóa” giúp kích hoạt hệ thống tự chữa lành tự nhiên vốn đã được lập trình sẵn trong cơ thể.</p>
          <p className="hero-description">Khóa học Online <strong>“DIỆN CHẨN KÍCH HOẠT ADN TỰ CHỮA LÀNH”.</strong> Đóng gói trọn bộ 25 bài giảng thực chiến giúp bạn khai thông ách tắc tại nhà.</p>
          <div className="value-bullets">
            <div className="value-bullet"><Check size={17} /> <span>Cắt đứt nhanh chóng những triệu chứng khó chịu đeo bám dai dẳng hằng ngày.</span></div>
            <div className="value-bullet"><Check size={17} /> <span>Chuẩn hóa quy trình từng bước, dễ nhớ, dễ làm và thấy ngay kết quả.</span></div>
            <div className="value-bullet"><Check size={17} /> <span>Sở hữu kỹ năng chăm sóc sức khỏe chủ động trọn đời cho bản thân, cha mẹ và con cái.</span></div>
            <div className="value-bullet"><Check size={17} /> <span>ƯU ĐÃI CỰC TỐT KHI THAM GIA</span></div>
          </div>
          <div className="hero-actions">
            <button data-testid="button-hero-register" className="cta" onClick={goToPayment}>ĐĂNG KÝ HỌC NGAY <ArrowRight size={16} /></button>
            <a data-testid="link-hero-outline" className="ghost-btn" href="#lo-trinh">XEM LỘ TRÌNH</a>
          </div>
          <div className="trust-row">
            <div><strong>11+</strong> Năm Kinh Nghiệm</div>
            <div><strong>500+</strong> Học Viên Đào Tạo Trực Tiếp</div>
            <div><strong>1.000+</strong> Ca Phục Hồi</div>
          </div>
        </div>
        <div className="hero-collage reveal" aria-label="Hình ảnh lớp học Diện Chẩn">
          <img className="hero-image-main" src={assets.hero} alt="Nguyễn Minh Đạt chia sẻ trong lớp học" />
          <img className="hero-image-small" src={assets.classOne} alt="Học viên thực hành Diện Chẩn" />
          <img className="hero-image-third" src={assets.classTwo} alt="Học viên học cùng giảng viên" />
        </div>
      </div>
    </section>
  );
}

const chapters = [
  {
    title: 'Chương 1: Nền Tảng Nhập Môn (7 bài)',
    lessons: ['Bài 1: Hành trình khám phá câu chuyện về Thầy Tổ.', 'Bài 2: Diện Chẩn – Điều Khiển Liệu Pháp là gì?', 'Bài 3: Giải mã hệ thống Huyệt đạo – Đồ hình – Dụng cụ Diện Chẩn.', 'Bài 4: Tư thế chuẩn hạn chế khí trượt đảo chiều.', 'Bài 5: Gia tăng hiệu quả khi dùng huyệt Diện Chẩn.', 'Bài 6: Cẩm nang sử dụng dụng cụ.', 'Bài 7: Dùng ngải cứu đúng Thời.'],
  },
  {
    title: 'Chương 2: Kích hoạt cơ chế tự chữa lành (4 bài)',
    lessons: ['Bài 8: Chăm sóc sức khỏe toàn diện', 'Bài 9: Đánh thức “ngân hàng thuốc” tiềm ẩn trong cơ thể.', 'Bài 10: Tăng sức đề kháng và chống viêm bằng thao tác đơn giản.', 'Bài 11: Những nguyên tắc vàng trong Diện Chẩn.'],
  },
  {
    title: 'Chương 3: Đọc vị cơ thể, xử lý tình huống (8 bài)',
    lessons: ['Bài 12: Vọng – Văn – Vấn – Thiết trong Diện Chẩn truy tìm nguồn gốc', 'Bài 13: Kỹ năng phòng bệnh chủ động.', 'Bài 14: Cấp cứu nhanh những tình huống khẩn cấp.', 'Bài 15: Xử lý hiện tượng huyết áp bất thường.', 'Bài 16: Xác định chính xác vị trí huyệt cơ bản.', 'Bài 17: Khai thông huyệt đạo.', 'Bài 18: Nâng tầm kỹ năng khai thông huyệt đạo.', 'Bài 19: Ứng dụng Ngũ hành tương sinh – tương khắc trong Diện Chẩn.'],
  },
  {
    title: 'Chương 4: Chinh phục 7 cửa ải thành chuyên gia (7 bài)',
    lessons: ['Bài 20: Phác đồ Chu Thiên Toàn Diện – Cân bằng năng lượng toàn thân.', 'Bài 21: Phác đồ Đa Năng – Giải pháp đa triệu chứng.', 'Bài 22: Đẩy lùi rối loạn tiền đình bằng Diện Chẩn.', 'Bài 23: Gỡ nút thắt thoái hóa – gai – thoát vị đốt sống cổ.', 'Bài 24: Chấm dứt cơn đau đầu không dùng thuốc.', 'Bài 25: Giải phóng cứng cổ vai gáy nhanh chóng.'],
  },
];

function LearningPath() {
  const [active, setActive] = useState(0);
  const characterPosition = active < 0 ? 0 : active;
  return (
    <section id="lo-trinh" className="section section-light" aria-labelledby="path-title">
      <div className="split">
        <div>
          <SectionLabel number="02" >Lộ trình học</SectionLabel>
          <div className="section-head"><h2 id="path-title" className="section-title">LỘ TRÌNH THÀNH <em>CHUYÊN NGHIỆP</em></h2></div>
          <div className="lesson-list">
            {chapters.map((chapter, index) => (
              <div className="lesson-item" key={chapter.title}>
                <button data-testid={`button-chapter-${index + 1}`} className="lesson-trigger" onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}>
                  <span>{chapter.title}</span><span>{active === index ? '−' : '+'}</span>
                </button>
                <div className={`lesson-content ${active === index ? 'open' : ''}`}>
                  <div><ul>{chapter.lessons.map((lesson) => <li key={lesson}><Play size={12} fill="currentColor" style={{ display: 'inline', marginRight: 8 }} />{lesson}</li>)}</ul></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`course-portrait chapter-active-${characterPosition}`} aria-label={`Nhân vật đang chỉ vào ${chapters[characterPosition].title}`}>
          <img src={assets.teacher} alt={`Nguyễn Minh Đạt chỉ vào ${chapters[characterPosition].title}`} />
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  const items = ['Có khả năng tự nhận biết, đọc hiểu các dấu hiệu bất thường trên mặt và cơ thể để dự phòng bệnh tật, chăm sóc bản thân một cách an toàn và tiết kiệm.', 'Thành thạo các thao tác khai thông khí huyết và các phác đồ xử lý triệu chứng.', 'Xây dựng lối sống lành mạnh, chủ động giúp dân văn phòng và freelancer cân bằng lại nhịp sống bận rộn, giảm stress áp lực công việc.', 'Hiểu rõ mối liên hệ giữa các phản chiếu trên gương mặt với cơ quan nội tạng bên trong cơ thể.', 'Sở hữu một “kỹ năng sinh tồn” thời đại số, trang bị thêm một năng lực tự chủ về sức khỏe nâng cao hiệu suất làm việc mỗi ngày.'];
  return (
    <section className="section" aria-labelledby="outcome-title">
      <div className="outcome-grid">
        <div><SectionLabel number="03">Kết quả sau khóa học</SectionLabel><h2 id="outcome-title" className="section-title">SAU KHÓA HỌC THÌ <em>BẠN SẼ:</em></h2></div>
        <div className="outcomes">{items.map((item, index) => <div className="outcome" key={item}><div className="outcome-icon" aria-hidden="true"><Sparkles size={21} strokeWidth={1.8} /><span className="outcome-icon-dot outcome-icon-dot-one" /><span className="outcome-icon-dot outcome-icon-dot-two" /></div><p data-testid={`text-outcome-${index + 1}`}>{item}</p></div>)}</div>
      </div>
    </section>
  );
}

function Audience() {
  const items = ['Muốn giải quyết trọn bộ triệu chứng khó chịu từ nữa thân người trên như: cổ vai gáy, tiền đình, đốt sống cổ, viêm xoang...', 'Tiết kiệm thời gian và không muốn dùng thuốc, muốn chủ động tự chăm sóc bản thân chỉ với 10-15 phút thực hành mỗi ngày.', 'Học một kỹ năng thực chiến không chỉ giúp ích cho bản thân mà còn chủ động hỗ trợ những người thân yêu (ông bà, cha mẹ, bạn bè...).', 'Thỏa mãn đam mê khám phá kiến thức mới mẻ, hiện đại, tự kích hoạt khả năng tự chữa lành tự nhiên, là một “món ăn tinh thần” hoàn toàn mới lạ, khoa học nhưng gần gũi, giúp mở rộng tư duy về chăm sóc sức khỏe toàn diện.'];
  return (
    <section className="section section-tint" aria-labelledby="audience-title">
      <SectionLabel number="04">Đối tượng phù hợp</SectionLabel>
      <h2 id="audience-title" className="section-title">MÀ TÓM LẠI... <em>AI SẼ CẦN</em> KHÓA HỌC NÀY!</h2>
      <div className="audience-grid" style={{ marginTop: '3rem' }}>{items.map((item, index) => <article className="audience-card" key={item}><span className="audience-number" aria-label={`Khu vực ${index + 1}`}>0{index + 1}</span><p data-testid={`text-audience-${index + 1}`}>{item}</p></article>)}</div>
    </section>
  );
}

function Bonus() {
  const items = ['Hỗ trợ 1:1 qua nhóm cộng đồng', 'Miễn phí tham gia các buổi học online nâng cao', 'Ebook độc quyền nhiều tuyệt chiêu', 'Nâng cấp tài khoản 1 năm thành trọn đời', 'Bộ checklist quy trình chăm sóc sức khỏe', 'Bản đồ tư duy lộ trình học.'];
  const giftIcons = [Headset, MonitorPlay, BookOpenText, Infinity, ClipboardCheck, Map];
  return (
    <section className="section bonus" aria-labelledby="bonus-title">
      <div className="bonus-grid"><div><SectionLabel number="05">Bonus</SectionLabel><h2 id="bonus-title" className="section-title">BỘ 6 MÓN QUÀ <em>ĐỘC QUYỀN</em> KHI ĐĂNG KÝ!</h2><button data-testid="button-bonus-register" className="cta" onClick={goToPayment} style={{ marginTop: '2rem' }}>ĐĂNG KÝ HỌC NGAY <ArrowRight size={16} /></button></div><div className="gift-grid">{items.map((item, index) => { const Icon = giftIcons[index]; return <div className="gift" key={item}><div className="gift-icon" aria-hidden="true"><Icon size={23} strokeWidth={1.8} /></div><p>{item}</p></div>; })}</div></div>
    </section>
  );
}

function Instructor() {
  return (
    <section id="giang-vien" className="section" aria-labelledby="teacher-title">
      <div className="instructor-layout"><div className="instructor-photos"><img src={assets.groupOne} alt="Nguyễn Minh Đạt cùng học viên" /><img src={assets.groupTwo} alt="Lớp học Diện Chẩn tại cộng đồng" /><img src={assets.groupThree} alt="Học viên nhận chứng nhận" /><img src={assets.groupFour} alt="Học viên hoàn thành khóa học" /><img src={assets.groupFive} alt="Nguyễn Minh Đạt cùng học viên trong buổi thực hành" /></div><div><SectionLabel number="06">Giảng viên</SectionLabel><h2 id="teacher-title" className="section-title"><span className="teacher-name">NGUYỄN MINH ĐẠT</span> LÀ AI?</h2><p className="hero-lead" style={{ marginTop: '1.25rem' }}>NGƯỜI THỔI HỒN VÀO HÀNH TRÌNH TỰ CHỮA LÀNH CỦA BẠN</p><blockquote className="quote">“Với tôi, Diện Chẩn không chỉ là một phương pháp chăm sóc sức khỏe, mà là một sự nghiệp tâm huyết và là phong cách sống suốt hơn 11 năm qua.<br /><br />Khóa học Online này được tôi ấp ủ và đóng gói với mục tiêu: Dù bạn ở bất kỳ đâu, bận rộn đến đâu, cũng có thể tiếp cận tinh hoa Diện Chẩn một cách đơn giản, và đây là phương pháp quản trị sức khỏe của người Việt Nam do Thầy Tổ Bùi Quốc Châu phát minh”</blockquote><div className="proof-panel"><div className="proofs-heading"><div className="proofs-heading-mark" aria-hidden="true"><BadgeCheck size={20} strokeWidth={1.8} /></div><div><p className="proofs-intro">Kinh nghiệm thực tế tạo nên sự tin cậy.</p></div></div><div className="proofs"><div className="proof"><span className="proof-icon" aria-hidden="true"><BadgeCheck size={17} strokeWidth={1.9} /></span><span><strong>11 Năm kinh nghiệm liên tục:</strong> Lấy Diện Chẩn làm nghề nghiệp chính và nghiên cứu chuyên sâu.</span></div><div className="proof"><span className="proof-icon" aria-hidden="true"><BadgeCheck size={17} strokeWidth={1.9} /></span><span><strong>500+ Học viên Offline:</strong> Hướng dẫn các lớp offline tại VP Diện Chẩn Vì Cộng Đồng – Chi Nhánh Q.1 (Diện Chẩn Boutique).</span></div><div className="proof"><span className="proof-icon" aria-hidden="true"><BadgeCheck size={17} strokeWidth={1.9} /></span><span><strong>1.000+ Ca phục hồi:</strong> Trực tiếp tham vấn và hỗ trợ phục hồi các triệu chứng cấp & mãn tính.</span></div></div></div></div></div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section price-section" aria-labelledby="price-title">
      <div className="price-wrap"><SectionLabel number="07">Bảng giá</SectionLabel><h2 id="price-title" className="section-title">BẢNG GIÁ SỞ HỮU KHÓA HỌC TRỌN ĐỜI</h2><p className="light-copy">KHÔNG CÓ SỔ HỒNG VÀ CŨNG KHÔNG CÓ VIEW BIỂN NHƯNG BẠN VẪN ĐẦU TƯ ĐƯỢC DÀI LÂU CHO SỨC KHỎE VỚI CHI PHÍ CỰC THẤP</p><div className="price-card"><p className="price-note"><em>Giá đang ưu đãi tri ân học viên hiện đang cực tốt lên tới 50%, chương trình này có thể kết thúc trước thời hạn!</em></p><p className="struck">Giá niêm yết: 1.750.000 VNĐ</p><p className="price">875.000 VNĐ</p><p className="price-note"><strong>Ưu đãi độc quyền hôm nay</strong> (Học trọn đời — Toàn bộ 25 bài học + 6 Quà tặng)</p><button data-testid="button-price-register" className="cta" onClick={goToPayment} style={{ marginTop: '1.25rem' }}>ĐĂNG KÝ HỌC NGAY <ArrowRight size={16} /></button></div></div>
    </section>
  );
}

type RegistrationFields = { fullName: string; phone: string; email: string };

function Payment() {
  const createRegistration = useCreateRegistration();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [form, setForm] = useState<RegistrationFields>({ fullName: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');
  const setField = (key: keyof RegistrationFields, value: string) => setForm((old) => ({ ...old, [key]: value }));
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullName = form.fullName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const next: Record<string, string> = {};
    if (fullName.length < 2) next.fullName = 'Vui lòng nhập họ và tên.';
    if (phone.length < 8) next.phone = 'Vui lòng nhập số điện thoại hợp lệ.';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Vui lòng nhập email chính xác.';
    if (!termsAccepted) next.terms = 'Vui lòng đồng ý với các điều khoản sử dụng dịch vụ.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSuccess('');
    createRegistration.mutate({
      data: {
        fullName,
        phone,
        email,
        registrationUrl: window.location.href,
      },
    }, {
      onSuccess: () => { window.location.assign('/'); },
      onError: (error) => {
        const apiError = error as { data?: { error?: unknown } };
        const message = typeof apiError.data?.error === 'string'
          ? apiError.data.error
          : 'Không thể gửi đăng ký lúc này. Vui lòng thử lại sau.';
        setErrors({ form: message });
      },
    });
  };
  return (
    <section id="thanh-toan" className="section payment" aria-labelledby="payment-title">
      <div className="payment-grid">
        <div>
          <SectionLabel number="08">Thanh toán & đăng ký tài khoản</SectionLabel>
          <h2 id="payment-title" className="section-title">CHỈ VÀI BƯỚC <span style={{ color: '#cf5c78' }}>ĐƠN GIẢN</span> LÀ CHÚNG TA CÙNG <span style={{ color: '#cf5c78' }}>ĐỒNG HÀNH</span> <span style={{ color: '#cf5c78' }}>TRỌN ĐỜI</span></h2>
          <div className="payment-step-card payment-step-one">
            <div className="payment-step-icon" aria-hidden="true"><QrCode size={21} strokeWidth={1.8} /></div>
            <div>
              <p className="payment-step-kicker">Bước 1 <span>· Thanh toán học phí</span></p>
              <p className="payment-step-copy">Quét mã QR bên dưới để thanh toán nhanh chóng, an toàn.</p>
              <p className="payment-transfer-chip">Nội dung chuyển khoản: <strong>Họ tên + SDT + ADN</strong></p>
            </div>
          </div>
          <div className="qr-card">
            <div className="qr-card-heading"><span>Quét mã QR để thanh toán</span><span className="qr-secure">Nhanh & an toàn</span></div>
            <img data-testid="img-payment-qr" src={assets.qr} alt="Mã QR thanh toán khóa học" />
            <p className="qr-note">Nội dung: Họ tên + SDT + ADN</p>
            <div className="transfer-info">
              <p className="transfer-heading">Thông tin chuyển khoản</p>
              <div className="transfer-details">
                <p><span>Chủ TK:</span> Nguyễn Minh Đạt</p>
                <p><span>Số TK:</span> 36810000254898</p>
                <p><span>Ngân Hàng:</span> BIDV</p>
              </div>
            </div>
          </div>
        </div>
        <form className="form-card" onSubmit={submit} noValidate>
          <div className="form-step-heading">
            <div className="form-step-icon" aria-hidden="true"><ClipboardPenLine size={21} strokeWidth={1.8} /></div>
            <div><p className="form-step-kicker">Bước 2 <span>· Kích hoạt tài khoản</span></p><h3>Đăng Ký Học Ngay</h3><p className="form-step-copy">Nhập thông tin để chúng tôi xác nhận thanh toán và kích hoạt khóa học cho bạn.</p></div>
          </div>
          {errors.form && <div className="form-error" role="alert">{errors.form}</div>}
          <div className="simple-form-fields">
            <Field id="fullName" label="👤 Họ và tên của bạn" placeholder="Nhập họ và tên..." value={form.fullName} error={errors.fullName} onChange={(value) => setField('fullName', value)} />
            <Field id="phone" label="📞 Số điện thoại (Zalo)" placeholder="Nhập số điện thoại..." value={form.phone} error={errors.phone} onChange={(value) => setField('phone', value)} />
            <Field id="email" type="email" label="✉️ Email nhận tài khoản học" placeholder="Nhập email chính xác..." value={form.email} error={errors.email} onChange={(value) => setField('email', value)} />
          </div>
          <div className="registration-consent">
            <label className="registration-consent-label">
              <input
                data-testid="checkbox-registration-terms"
                type="checkbox"
                checked={termsAccepted}
                required
                aria-invalid={Boolean(errors.terms)}
                aria-describedby={errors.terms ? 'registration-terms-error' : undefined}
                onChange={(event) => {
                  setTermsAccepted(event.target.checked);
                  setErrors((previous) => { const { terms, ...rest } = previous; return rest; });
                }}
              />
              <span>Tôi đồng ý với các điều khoản sử dụng dịch vụ</span>
            </label>
            {errors.terms && <span id="registration-terms-error" className="form-error" role="alert">{errors.terms}</span>}
            <p className="registration-privacy-note">Thông tin của bạn được bảo mật tuyệt đối và chỉ dùng để liên hệ kích hoạt khoá học</p>
          </div>
          <button data-testid="button-submit-registration" className="cta" type="submit" disabled={createRegistration.isPending} style={{ marginTop: '1.25rem', width: '100%' }}>
            {createRegistration.isPending ? 'ĐANG GỬI ĐĂNG KÝ...' : 'ĐĂNG KÝ HỌC NGAY'} <ArrowRight size={16} />
          </button>
          {success && <div className="form-success" role="status"><FileCheck2 size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />{success}</div>}
        </form>
      </div>
    </section>
  );
}

function Field({ id, label, placeholder, value, error, onChange, type = 'text' }: { id: string; label: string; placeholder: string; value: string; error?: string; onChange: (value: string) => void; type?: string }) {
  return <div className="field"><label htmlFor={id}>{label}</label><input data-testid={`input-${id}`} id={id} type={type} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />{error && <span className="form-error">{error}</span>}</div>;
}

const faqs = [
  ['Tôi chưa từng học y học cổ truyền hay bấm huyệt bao giờ thì có học được không?', 'Hoàn toàn được! Khóa học được thiết kế từ số 0, dùng ngôn ngữ hiện đại, đồ hình trực quan và hướng dẫn từng động tác rất chi tiết, ai cũng có thể làm theo dễ dàng.'],
  ['Tôi học online như thế nào và thời hạn xem video là bao lâu?', 'Sau khi thanh toán và được admin kích hoạt, bạn đăng nhập vào website để học trên nền tảng video chuyên biệt. Bạn được tặng ngay gói sở hữu và xem lại trọn đời mọi lúc, mọi nơi trên điện thoại hay máy tính.'],
  ['Khi thực hành nếu không tìm đúng huyệt hoặc có thắc mắc thì ai hỗ trợ?', 'Bạn sẽ được tham gia nhóm hỗ trợ độc quyền và các buổi Zoom trực tiếp cùng Nguyễn Minh Đạt để được giải đáp và hướng dẫn tỉ mỉ.'],
  ['Có bắt buộc phải có dụng cụ đầy đủ không?', 'Bạn hoàn toàn có thể dùng các vật dụng sẵn có như đầu ngón tay, chìa khóa... để làm ngay.'],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="section faq" aria-labelledby="faq-title"><div style={{ textAlign: 'center' }}><SectionLabel number="09">Câu hỏi thường gặp</SectionLabel><h2 id="faq-title" className="section-title" style={{ margin: '1.2rem auto 0' }}>CÂU HỎI <em>THƯỜNG GẶP</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button data-testid={`button-faq-${index + 1}`} className="faq-trigger" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}><span className="faq-icon" aria-hidden="true"><Sparkles size={17} strokeWidth={1.8} /><span className="faq-icon-dot faq-icon-dot-one" /><span className="faq-icon-dot faq-icon-dot-two" /></span><span className="faq-question">{index + 1}. {question}</span><ChevronDown size={17} style={{ transform: open === index ? 'rotate(180deg)' : undefined, transition: 'transform .2s' }} /></button>{open === index && <div className="faq-answer" data-testid={`text-faq-answer-${index + 1}`}>{answer}</div>}</div>)}</div></section>;
}

function markdownToHtml(markdown: string): string {
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return markdown.split(/\n{2,}/).map((block) => {
    const inline = escape(block)
      .replace(/!\[([^\]]*)\]\(((?:\/|https?:\/\/)[^)]+)\)/g, '<img src="$2" alt="$1" />')
      .replace(/\[([^\]]+)\]\(((?:https?:\/\/)[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\n/g, '<br />');
    return inline.startsWith('<h') || inline.startsWith('<li>') ? inline : `<p>${inline}</p>`;
  }).join('');
}

function NewsArticleContent({ post }: { post: Post }) {
  return <article className="news-article news-featured-article"><div className="news-card-date">{new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('vi-VN')}</div><h1>{post.title}</h1><p className="news-article-excerpt">{post.excerpt}</p>{post.thumbnailUrl && <img className="news-article-image" src={post.thumbnailUrl} alt="" />}<div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} /></article>;
}

function NewsArchiveList({ posts }: { posts: Post[] }) {
  return <section className="news-archive" aria-labelledby="news-archive-title"><div className="eyebrow news-eyebrow">Tin tức Diện Chẩn</div><h2 id="news-archive-title" className="news-archive-title">Các bài viết trước</h2>{posts.length === 0 ? <div className="news-empty news-archive-empty">Chưa có bài viết cũ.</div> : <div className="news-grid news-old-list">{posts.map((post) => <Link className="news-card" href={`/tin-tuc/${post.slug}`} key={post.id}>{post.thumbnailUrl && <img src={post.thumbnailUrl} alt="" /> }<div className="news-card-body"><span className="news-card-date">{new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('vi-VN')}</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="news-read-more">Đọc bài viết <ArrowRight size={15} /></span></div></Link>)}</div>}</section>;
}

function NewsListPage() {
  const postsQuery = useListPublishedPosts();
  const posts = postsQuery.data ?? [];
  const latestPost = posts[0];
  return <div className="news-shell"><header className="news-top"><Link className="admin-brand" href="/">Tin tức Diện Chẩn</Link><Link className="news-back" href="/">Về trang chủ</Link></header><main className="news-main"><div className="eyebrow news-eyebrow">Kiến thức & chăm sóc sức khỏe</div><h1 className="news-title">Tin tức mới nhất</h1><p className="news-intro">Những chia sẻ thực tế từ Diện Chẩn Boutique giúp bạn chủ động chăm sóc sức khỏe mỗi ngày.</p>{postsQuery.isLoading ? <div className="news-grid"><div className="news-card news-skeleton" /></div> : postsQuery.isError ? <div className="news-empty">Không thể tải bài viết lúc này. Vui lòng thử lại sau.</div> : posts.length === 0 ? <div className="news-empty">Chưa có bài viết được xuất bản.</div> : <><NewsArticleContent post={latestPost} /><div className="news-archive-divider" /><NewsArchiveList posts={posts.slice(1)} /></>}</main></div>;
}

function NewsPostPage() {
  const [location] = useLocation();
  const slug = decodeURIComponent(location.replace(/^\/tin-tuc\//, '').split('?')[0]);
  const postQuery = useGetPublishedPost(slug, { query: { queryKey: getGetPublishedPostQueryKey(slug), enabled: Boolean(slug) } });
  const post = postQuery.data;
  if (postQuery.isLoading) return <div className="news-shell"><main className="news-main news-loading">Đang tải bài viết...</main></div>;
  if (postQuery.isError || !post) return <div className="news-shell"><main className="news-main"><div className="news-empty">Không tìm thấy bài viết.</div><Link className="news-back-button" href="/tin-tuc">Quay lại Tin tức</Link></main></div>;
  return <div className="news-shell"><header className="news-top"><Link className="admin-brand" href="/">Tin tức Diện Chẩn</Link><Link className="news-back" href="/tin-tuc">Tin tức mới nhất</Link></header><main className="news-main"><Link className="news-back-button" href="/tin-tuc">← Tin tức</Link><NewsArticleContent post={post} /></main></div>;
}

function ContactPage() {
  return <div className="contact-page"><header className="contact-top"><Link className="contact-back" href="/">← Về trang chủ</Link></header><main className="contact-main"><section className="contact-card" aria-labelledby="contact-title"><div className="contact-copy"><div className="eyebrow contact-eyebrow">DIỆN CHẨN BOUTIQUE</div><h1 id="contact-title">DIỆN CHẨN KÍCH HOẠT ADN<br />TỰ CHỮA LÀNH</h1><p className="contact-tagline">Học đúng phương pháp – Thực hành đúng cách.</p><div className="contact-info"><a href="tel:0919994282"><span className="contact-icon" aria-hidden="true">⌕</span><span><small>Hotline / Zalo</small><strong>091.999.4282</strong></span></a><a href="mailto:dienchanboutique@gmail.com"><span className="contact-icon" aria-hidden="true">✉</span><span><small>Email</small><strong>dienchanboutique@gmail.com</strong></span></a><a href="https://www.khoahocdienchan.com" target="_blank" rel="noreferrer"><span className="contact-icon" aria-hidden="true">◎</span><span><small>Website</small><strong>www.khoahocdienchan.com</strong></span></a></div><div className="contact-rule" /><p className="contact-copyright">Copyright 2026 Bản quyền thuộc về Nguyễn Minh Đạt. All rights reserved.</p></div><div className="contact-illustration" aria-hidden="true"><div className="contact-orbit contact-orbit-large" /><div className="contact-orbit contact-orbit-small" /></div></section></main></div>;
}

function Footer() {
  return <footer id="lien-he" className="footer" aria-labelledby="footer-title"><div className="footer-content"><SectionLabel number="10">Thông Tin Bản Quyền</SectionLabel><h2 id="footer-title">DIỆN CHẨN KÍCH HOẠT ADN TỰ CHỮA LÀNH</h2><p style={{ color: '#ede6d6', maxWidth: 490, lineHeight: 1.6 }}>Học đúng phương pháp – Thực hành đúng cách.</p><div className="footer-info"><div><span>📞 Hotline / Zalo:</span> 091.999.4282</div><div><span>✉️ Email:</span> dienchanboutique@gmail.com</div><div><span>🌐 Website:</span> www.khoahocdienchan.com</div></div><div className="footer-bottom">Copyright 2026 Bản quyền thuộc về Nguyễn Minh Đạt. All rights reserved.</div></div></footer>;
}

function Landing() {
  return <div className="page-shell grain"><Nav /><main><Hero /><LearningPath /><Outcomes /><Audience /><Bonus /><Instructor /><Pricing /><Payment /><FAQ /></main><Footer /></div>;
}

function AuthHeader() {
  return <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, padding: '1rem 1.25rem' }}><Link data-testid="link-auth-logo" href="/"><Logo /></Link></div>;
}

function LoginPage() {
  const [, setLocation] = useLocation();
  const login = useLoginStudent();
  const reset = useRequestPasswordReset();
  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const submitLogin = (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setMessage('');
    if (!email || !password) { setError('Vui lòng nhập đầy đủ email và mật khẩu.'); return; }
    login.mutate({ data: { email, password } }, { onSuccess: (result) => setMessage(result.message || (result.status === 'active' ? 'Đăng nhập thành công.' : 'Tài khoản đang chờ xác nhận thanh toán.')), onError: () => setError('Email hoặc mật khẩu chưa chính xác. Vui lòng thử lại.') });
  };
  const submitReset = (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setMessage('');
    if (!email) { setError('Vui lòng nhập email đã đăng ký.'); return; }
    reset.mutate({ data: { email } }, { onSuccess: (result) => setMessage(result.message || 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.'), onError: () => setError('Không thể gửi yêu cầu lúc này. Vui lòng thử lại.') });
  };
  return <div className="auth-shell"><AuthHeader /><div className="auth-art"><div className="eyebrow">Diện Chẩn Boutique · Học online</div><div><h1>Tự chăm sóc.<br />Tự chủ hơn.</h1><p>Học những thao tác nhẹ nhàng, thực tế và vừa vặn với một ngày bận rộn.</p></div><div className="mono" style={{ color: '#ead292', fontSize: '.7rem' }}>DIỆN CHẨN KÍCH HOẠT ADN TỰ CHỮA LÀNH</div></div><div className="auth-panel"><form className="auth-form" onSubmit={mode === 'login' ? submitLogin : submitReset}><div className="eyebrow" style={{ color: '#713520' }}>{mode === 'login' ? 'Khu vực học viên' : 'Khôi phục quyền truy cập'}</div><h2>{mode === 'login' ? 'Chào mừng trở lại.' : 'Đặt lại mật khẩu.'}</h2><p>{mode === 'login' ? 'Đăng nhập để tiếp tục hành trình học của bạn.' : 'Nhập email đã đăng ký. Chúng tôi sẽ gửi liên kết an toàn để bạn tự đặt lại mật khẩu.'}</p>{error && <div className="form-error" role="alert" style={{ color: '#9c2e4c', marginBottom: '1rem' }}>{error}</div>}{message && <div className="auth-message" role="status">{message}</div>}<div className="field"><label htmlFor="auth-email">Email</label><input data-testid="input-auth-email" id="auth-email" type="email" placeholder="ten@email.com" value={email} onChange={(event) => setEmail(event.target.value)} /></div>{mode === 'login' && <div className="field"><label htmlFor="auth-password">Mật khẩu</label><input data-testid="input-auth-password" id="auth-password" type="password" placeholder="Nhập mật khẩu của bạn" value={password} onChange={(event) => setPassword(event.target.value)} /></div>}<button data-testid="button-auth-submit" className="cta" type="submit" style={{ width: '100%', marginTop: '.7rem' }}>{(login.isPending || reset.isPending) ? 'ĐANG XỬ LÝ...' : mode === 'login' ? 'ĐĂNG NHẬP' : 'GỬI LIÊN KẾT ĐẶT LẠI'} <ArrowRight size={16} /></button><div className="auth-links">{mode === 'login' ? <button data-testid="button-forgot-password" className="text-button" type="button" onClick={() => { setMode('reset'); setMessage(''); setError(''); }}>Quên mật khẩu?</button> : <button data-testid="button-back-login" className="text-button" type="button" onClick={() => { setMode('login'); setMessage(''); setError(''); }}>Quay lại đăng nhập</button>}<button data-testid="button-back-home" className="text-button" type="button" onClick={() => setLocation('/')}>Về trang chủ</button></div></form></div></div>;
}

function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const login = useAdminLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Vui lòng nhập email và mật khẩu quản trị viên.');
      return;
    }
    login.mutate({ data: { email: email.trim(), password } }, {
      onSuccess: () => setLocation('/admin/posts/new'),
      onError: (reason) => {
        const response = reason as { data?: { error?: string } };
        setError(response.data?.error ?? 'Đăng nhập quản trị viên không thành công.');
      },
    });
  };
  return <div className="admin-login-shell"><div className="admin-login-card"><Link className="admin-login-logo" href="/"><img src={assets.logo} alt="Diện Chẩn Boutique" /></Link><div className="eyebrow">Khu vực quản trị</div><h1>Đăng nhập Admin</h1><p>Đăng nhập để soạn thảo và xuất bản bài viết Tin tức.</p><form onSubmit={submit}><div className="field"><label htmlFor="admin-email">Email quản trị viên</label><input id="admin-email" data-testid="input-admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" /></div><div className="field"><label htmlFor="admin-password">Mật khẩu</label><input id="admin-password" data-testid="input-admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></div>{error && <div className="form-error admin-login-error" role="alert">{error}</div>}<button data-testid="button-admin-login" className="cta" type="submit" disabled={login.isPending}>{login.isPending ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP ADMIN'} <ArrowRight size={16} /></button></form><Link className="admin-login-home" href="/">← Về trang chủ</Link></div></div>;
}

function AdminGate({ children }: { children: ReactNode }) {
  const session = useGetAdminSession({ query: { queryKey: getGetAdminSessionQueryKey(), retry: false } });
  if (session.isLoading) return <div className="admin-loading">Đang kiểm tra phiên quản trị...</div>;
  if (session.isError || !session.data) return <Redirect to="/admin/login" />;
  return <>{children}</>;
}

const emptyPost: PostInput = { title: '', thumbnailUrl: null, excerpt: '', content: '', status: 'draft' };

function AdminPostsListPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const postsQuery = useListAdminPosts({ query: { queryKey: getListAdminPostsQueryKey(), retry: false } });
  const deletePost = useDeleteAdminPost();
  const logout = useAdminLogout();
  const posts = postsQuery.data ?? [];
  const handleDelete = (post: Post) => {
    if (!window.confirm(`Xóa bài viết “${post.title}”?`)) return;
    deletePost.mutate({ id: post.id }, { onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['/api/admin/posts'] }); } });
  };
  return <div className="admin-shell"><header className="admin-top"><Link className="admin-brand" href="/"><img src={assets.logo} alt="Diện Chẩn Boutique" />Diện Chẩn / Tin tức</Link><div className="admin-top-actions"><Link className="small-action admin-top-link" href="/admin">Đơn đăng ký</Link><button className="small-action admin-top-link" onClick={() => logout.mutate(undefined, { onSuccess: () => setLocation('/admin/login') })}>Đăng xuất</button></div></header><main className="admin-main"><div className="admin-page-heading"><div><div className="eyebrow" style={{ color: '#713520' }}>Quản lý nội dung</div><h1>Bài viết Tin tức</h1></div><Link className="cta admin-create-button" href="/admin/posts/new">+ Soạn bài mới</Link></div>{postsQuery.isLoading ? <div className="news-empty">Đang tải bài viết...</div> : posts.length === 0 ? <div className="news-empty">Chưa có bài viết. Hãy tạo bài đầu tiên.</div> : <div className="admin-post-list">{posts.map((post) => <article className="admin-post-row" key={post.id}>{post.thumbnailUrl && <img src={post.thumbnailUrl} alt="" />}<div><span className={`admin-post-status ${post.status}`}>{post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}</span><h2>{post.title}</h2><p>{post.excerpt || 'Chưa có tóm tắt.'}</p><small>Cập nhật {new Date(post.updatedAt).toLocaleDateString('vi-VN')}</small></div><div className="admin-post-actions"><Link className="small-action" href={`/admin/posts/${post.id}/edit`}>Sửa</Link><button className="small-action reject" onClick={() => handleDelete(post)} disabled={deletePost.isPending}>Xóa</button></div></article>)}</div>}</main></div>;
}

function AdminPostEditor() {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const postsQuery = useListAdminPosts({ query: { queryKey: getListAdminPostsQueryKey(), retry: false } });
  const createPost = useCreateAdminPost();
  const updatePost = useUpdateAdminPost();
  const uploadImage = useRequestAdminUploadUrl();
  const editId = Number(/^\/admin\/posts\/(\d+)\/edit/.exec(location)?.[1] ?? 0);
  const existing = editId ? postsQuery.data?.find((post) => post.id === editId) : undefined;
  const [form, setForm] = useState<PostInput>(emptyPost);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (existing) setForm({ title: existing.title, thumbnailUrl: existing.thumbnailUrl, excerpt: existing.excerpt, content: existing.content, status: existing.status });
  }, [existing]);
  const setField = <K extends keyof PostInput>(key: K, value: PostInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  const uploadFile = async (file: File): Promise<string> => {
    if (!file.type.startsWith('image/')) throw new Error('image');
    const result = await uploadImage.mutateAsync({ data: { name: file.name, size: file.size, contentType: file.type } });
    const response = await fetch(result.uploadURL, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
    if (!response.ok) throw new Error('upload');
    return `/api/storage${result.objectPath}`;
  };
  const upload = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      setField('thumbnailUrl', await uploadFile(file));
    } catch {
      setError('Không thể tải ảnh lên. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };
  const insertContentImages = async (files: FileList) => {
    const selectedFiles = Array.from(files);
    if (!selectedFiles.length) return;
    setError('');
    setUploading(true);
    const uploaded: Array<{ file: File; url: string }> = [];
    try {
      for (const file of selectedFiles) {
        try {
          uploaded.push({ file, url: await uploadFile(file) });
        } catch {
          // Keep successfully uploaded files and report a single actionable error below.
        }
      }
      if (uploaded.length) {
        const textarea = contentInputRef.current;
        const currentContent = form.content;
        const start = textarea?.selectionStart ?? currentContent.length;
        const end = textarea?.selectionEnd ?? start;
        const snippets = uploaded
          .map(({ file, url }) => `![${file.name.replace(/[\[\]]/g, '')}](${url})`)
          .join('\n\n');
        const nextContent = `${currentContent.slice(0, start)}${snippets}${currentContent.slice(end)}`;
        setField('content', nextContent);
        requestAnimationFrame(() => {
          const nextTextarea = contentInputRef.current;
          if (!nextTextarea) return;
          const cursor = start + snippets.length;
          nextTextarea.focus();
          nextTextarea.setSelectionRange(cursor, cursor);
        });
      }
      if (uploaded.length !== selectedFiles.length) {
        setError(uploaded.length ? 'Một số ảnh không tải lên được. Các ảnh còn lại đã được chèn vào nội dung.' : 'Không thể tải ảnh lên. Vui lòng thử lại.');
      }
    } finally {
      setUploading(false);
    }
  };
  const save = (status: PostInput['status']) => {
    const payload = { ...form, status };
    if (payload.title.trim().length < 3 || !payload.content.trim()) {
      setError('Vui lòng nhập tiêu đề và nội dung bài viết.');
      return;
    }
    setError('');
    const options = { onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['/api/admin/posts'] }); setLocation('/admin/posts'); }, onError: () => setError('Không thể lưu bài viết. Vui lòng thử lại.') };
    if (editId) updatePost.mutate({ id: editId, data: payload }, options);
    else createPost.mutate({ data: payload }, options);
  };
  const busy = createPost.isPending || updatePost.isPending || uploading;
  return <div className="admin-shell"><header className="admin-top"><Link className="admin-brand" href="/"><img src={assets.logo} alt="Diện Chẩn Boutique" />Diện Chẩn / Soạn bài</Link><div className="admin-top-actions"><Link className="small-action admin-top-link" href="/admin/posts">Danh sách bài viết</Link><Link className="small-action admin-top-link" href="/admin">Đơn đăng ký</Link></div></header><main className="admin-main"><Link className="news-back-button" href="/admin/posts">← Danh sách bài viết</Link><div className="admin-page-heading"><div><div className="eyebrow" style={{ color: '#713520' }}>{editId ? 'Chỉnh sửa nội dung' : 'Bài viết mới'}</div><h1>{editId ? 'Chỉnh sửa bài viết' : 'Soạn bài Tin tức'}</h1></div></div><form className="post-editor" onSubmit={(event) => { event.preventDefault(); save('draft'); }}><div className="post-editor-main"><div className="field"><label htmlFor="post-title">Tiêu đề bài viết</label><input id="post-title" data-testid="input-post-title" value={form.title} onChange={(event) => setField('title', event.target.value)} placeholder="Ví dụ: 5 phút chăm sóc cổ vai gáy tại nhà" /></div><div className="field"><label htmlFor="post-excerpt">Tóm tắt</label><textarea id="post-excerpt" data-testid="input-post-excerpt" rows={3} maxLength={500} value={form.excerpt} onChange={(event) => setField('excerpt', event.target.value)} placeholder="Một đoạn ngắn giới thiệu nội dung bài viết..." /></div><div className="field"><div className="content-field-heading"><label htmlFor="post-content">Nội dung chi tiết <span className="field-hint">Hỗ trợ Markdown</span></label><label className="content-image-button"><input data-testid="input-post-content-images" type="file" accept="image/*" multiple onChange={(event) => { if (event.target.files) void insertContentImages(event.target.files); event.currentTarget.value = ''; }} /><ImagePlus size={15} />{uploading ? 'Đang tải ảnh...' : 'Chèn ảnh vào nội dung'}</label></div><textarea ref={contentInputRef} id="post-content" data-testid="input-post-content" className="post-content-input" rows={18} value={form.content} onChange={(event) => setField('content', event.target.value)} placeholder={'# Tiêu đề phụ\n\nViết một đoạn nội dung...\n\nChèn ảnh vào vị trí con trỏ bằng nút “Chèn ảnh vào nội dung”.'} /><span className="field-hint">Đặt con trỏ sau mỗi đoạn văn rồi chèn một hoặc nhiều ảnh. Ảnh sẽ xuất hiện đúng vị trí đó trong bài viết.</span></div></div><aside className="post-editor-side"><div className="field"><label>Ảnh đại diện</label>{form.thumbnailUrl && <img className="post-thumbnail-preview" src={form.thumbnailUrl} alt="Xem trước ảnh đại diện" />}<label className="upload-button"><input data-testid="input-post-thumbnail" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); event.currentTarget.value = ''; }} />{uploading ? 'Đang tải ảnh...' : 'Chọn ảnh từ máy'}</label><span className="field-hint">PNG, JPG hoặc WebP · tối đa 10MB</span></div><div className="post-publish-box"><label htmlFor="post-status">Trạng thái</label><select id="post-status" value={form.status} onChange={(event) => setField('status', event.target.value as PostInput['status'])}><option value="draft">Bản nháp</option><option value="published">Đã xuất bản</option></select><button data-testid="button-save-post" className="cta" type="submit" disabled={busy}>Lưu bản nháp</button><button data-testid="button-publish-post" className="small-action publish-button" type="button" disabled={busy} onClick={() => save('published')}>Lưu & xuất bản</button></div></aside>{error && <div className="form-error post-editor-error" role="alert">{error}</div>}</form></main></div>;
}

function AdminPage() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<'all' | 'pending' | 'paid' | 'rejected'>('all');
  const ordersQuery = useListAdminOrders({ status }, { query: { queryKey: getListAdminOrdersQueryKey({ status }) } });
  const summaryQuery = useGetAdminSummary({ query: { queryKey: getGetAdminSummaryQueryKey() } });
  const review = useReviewAdminOrder();
  const [rejecting, setRejecting] = useState<number | null>(null);
  const [reason, setReason] = useState('');
  const orders = ordersQuery.data ?? [];
  const summary = summaryQuery.data;
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }), []);
  const reviewOrder = (id: number, decision: 'approve' | 'reject') => {
    review.mutate({ id, data: { decision, ...(decision === 'reject' ? { reason: reason || 'Biên lai chưa đủ thông tin xác nhận.' } : {}) } }, { onSuccess: () => { setRejecting(null); setReason(''); void queryClient.invalidateQueries({ queryKey: getListAdminOrdersQueryKey({ status }) }); void queryClient.invalidateQueries({ queryKey: getGetAdminSummaryQueryKey() }); } });
  };
  return <div className="admin-shell"><header className="admin-top"><Link data-testid="link-admin-brand" className="admin-brand" href="/"><img src={assets.logo} alt="Diện Chẩn Boutique" />Diện Chẩn / Admin</Link><Link data-testid="link-admin-home" href="/">Về trang chủ</Link></header><main className="admin-main"><div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}><div><div className="eyebrow" style={{ color: '#713520' }}>Bảng điều hành</div><h1>Duyệt đơn đăng ký</h1></div><button data-testid="button-admin-refresh" className="small-action" onClick={() => { void ordersQuery.refetch(); void summaryQuery.refetch(); }}><RefreshCcw size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />Làm mới dữ liệu</button></div><div className="summary-grid">{summaryQuery.isLoading ? [1, 2, 3, 4].map((item) => <div className="summary-card" key={item}><div className="skeleton" /></div>) : <><Summary label="Tổng đăng ký" value={summary?.totalRegistrations ?? 0} /><Summary label="Đang chờ duyệt" value={summary?.pendingOrders ?? 0} /><Summary label="Đã kích hoạt" value={summary?.approvedOrders ?? 0} /><Summary label="Doanh thu" value={`${(summary?.totalRevenue ?? 0).toLocaleString('vi-VN')} ₫`} /></>}</div><div className="admin-toolbar"><strong>Đơn đăng ký khóa học</strong><select data-testid="select-order-status" className="admin-filter" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="all">Tất cả trạng thái</option><option value="pending">Chờ xác nhận</option><option value="paid">Đã thanh toán</option><option value="rejected">Từ chối</option></select></div>{ordersQuery.isLoading ? <div className="admin-table-wrap" style={{ padding: '1.5rem', display: 'grid', gap: '.8rem' }}>{[1, 2, 3].map((item) => <div className="skeleton" key={item} />)}</div> : ordersQuery.isError ? <div className="error-state"><p>Không thể tải danh sách đơn hàng.</p><button data-testid="button-admin-retry" className="small-action" onClick={() => void ordersQuery.refetch()}>Thử lại</button></div> : orders.length === 0 ? <div className="empty-state"><FileCheck2 size={30} /><p>Chưa có đơn đăng ký trong trạng thái này.</p></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Học viên</th><th>Liên hệ</th><th>Ngày đăng ký</th><th>Thanh toán</th><th>Tài khoản</th><th>Biên lai</th><th>Thao tác</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} data-testid={`row-order-${order.id}`}><td><strong>{order.fullName}</strong><br /><span style={{ color: '#426178' }}>#{order.id}</span></td><td>{order.email}<br />{order.phone}</td><td>{dateFormatter.format(new Date(order.createdAt))}</td><td><span className={`status ${order.status}`}>{order.status === 'pending' ? 'Chờ xác nhận' : order.status === 'paid' ? 'Đã thanh toán' : 'Từ chối'}</span></td><td>{order.accountStatus === 'active' ? 'Active' : order.accountStatus === 'inactive' ? 'Inactive' : 'Chờ kích hoạt'}</td><td><a data-testid={`link-receipt-${order.id}`} href={order.receiptUrl} target="_blank" rel="noreferrer" className="small-action">Xem ảnh</a></td><td>{order.status === 'pending' ? <div className="admin-actions">{rejecting === order.id ? <div style={{ display: 'grid', gap: '.35rem' }}><input data-testid={`input-rejection-${order.id}`} className="admin-filter" placeholder="Lý do từ chối" value={reason} onChange={(event) => setReason(event.target.value)} /><div className="admin-actions"><button data-testid={`button-confirm-reject-${order.id}`} className="small-action reject" onClick={() => reviewOrder(order.id, 'reject')}>Xác nhận</button><button data-testid={`button-cancel-reject-${order.id}`} className="small-action" onClick={() => setRejecting(null)}>Hủy</button></div></div> : <><button data-testid={`button-approve-${order.id}`} className="small-action approve" disabled={review.isPending} onClick={() => reviewOrder(order.id, 'approve')}>Duyệt</button><button data-testid={`button-reject-${order.id}`} className="small-action reject" onClick={() => setRejecting(order.id)}>Từ chối</button></>}</div> : <span style={{ color: '#426178', fontSize: '.75rem' }}>Đã xử lý</span>}</td></tr>)}</tbody></table></div>}</main></div>;
}

function Summary({ label, value }: { label: string; value: number | string }) {
  return <div className="summary-card" data-testid={`summary-${label}`}><span>{label}</span><strong>{value}</strong></div>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Landing} /><Route path="/lien-he" component={ContactPage} /><Route path="/tin-tuc" component={NewsListPage} /><Route path="/tin-tuc/:slug" component={NewsPostPage} /><Route path="/dang-nhap" component={LoginPage} /><Route path="/admin/login" component={AdminLoginPage} /><Route path="/admin/posts/new" component={() => <AdminGate><AdminPostEditor /></AdminGate>} /><Route path="/admin/posts/:id/edit" component={() => <AdminGate><AdminPostEditor /></AdminGate>} /><Route path="/admin/posts" component={() => <AdminGate><AdminPostsListPage /></AdminGate>} /><Route path="/admin" component={() => <AdminGate><AdminPage /></AdminGate>} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter></QueryClientProvider>;
}

export default App;