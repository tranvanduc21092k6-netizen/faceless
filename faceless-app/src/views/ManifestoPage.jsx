'use client'

import Link from 'next/link'
import DialecticDivider from '../components/ui/DialecticDivider'

const tenets = [
  { num: '01', title: 'THUẦN KHIẾT BẢN THỂ', body: 'Ý tưởng tồn tại độc lập với người sáng tạo. Chúng tôi tôn vinh tư duy, không phải người nghĩ.' },
  { num: '02', title: 'BIỆN CHỨNG TRIỆT ĐỂ', body: 'Không có chân lý nào là cuối cùng. Mỗi luận đề đều mời gọi một phản đề để hình thành sự tổng hợp cao hơn.' },
  { num: '03', title: 'NGHIÊM CẨN THẨM MỸ', body: 'Kiến trúc quyết định bầu không khí. Thiết kế tối giản nuôi dưỡng sự tập trung tối đa.' },
  { num: '04', title: 'CHỦ QUYỀN TRÍ TUỆ', body: 'Người đọc là nhà tổng hợp cuối cùng. Chúng tôi cung cấp công cụ; bạn cung cấp trí tuệ.' },
  { num: '05', title: 'MINH TRIẾT DẠ HÀNH', body: 'Tư duy sâu sắc thịnh vượng trong những giờ yên tĩnh. Chúng tôi là hội nghị nửa đêm số.' },
  { num: '06', title: 'VƯỢT NGOÀI DỮ LIỆU', body: 'Thông tin là tiếng ồn. Trí tuệ là tín hiệu. Chúng tôi theo đuổi cái sau với sự tập trung không ngừng.' },
]

export default function ManifestoPage() {
  return (
    <div className="pt-[120px] pb-section-gap">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[680px] mx-auto text-center md:text-left">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em] block mb-6">
            Lời Mở Đầu
          </span>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6">
            Tuyên Ngôn Faceless
          </h1>
          <p className="font-pull-quote text-[20px] md:text-[24px] text-on-surface italic leading-relaxed opacity-90">
            Một cam kết với sự thuần khiết của tư duy, không bị gánh nặng bởi sự phù phiếm của bản ngã.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap">
        <div className="max-w-[680px] mx-auto">
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Trong kỷ nguyên của danh tính biểu diễn, chúng tôi chọn sự trống rỗng. Thời đại số đã biến diễn ngôn thành cuộc cạnh tranh của những hình bóng, nơi tính hợp lệ của một ý tưởng được đo bằng sự phổ biến của người mang nó. Faceless từ chối tiếng ồn sinh học và xã hội này. Chúng tôi tin rằng sự tổng hợp chỉ có thể khi bản ngã được buông bỏ cho biện chứng.
          </p>
        </div>
      </section>

      <div className="max-w-[680px] mx-auto px-margin-mobile md:px-margin-desktop">
        <DialecticDivider variant="line" />
      </div>

      {/* Section I */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-headline-md text-headline-md text-primary italic mb-6">
            I. Sự Ẩn Danh Của Trí Tuệ
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-12">
            Sự truy vấn chân chính đòi hỏi một chiếc áo choàng. Khi người nói bị loại bỏ, chỉ còn lời nói. Đây không phải hành động hèn nhát, mà là sự minh bạch triệt để. Bằng cách lột bỏ khuôn mặt, chúng ta lột bỏ những định kiến về chủng tộc, giai cấp, giới tính và lịch sử vốn vô thức neo giữ việc đánh giá chân lý của chúng ta.
          </p>

          {/* Pull Quote */}
          <blockquote className="border-l-2 border-primary pl-8 py-4 my-12">
            <p className="font-pull-quote text-pull-quote text-on-surface italic leading-relaxed">
              "Những chân lý sâu sắc nhất là những chân lý không thuộc về ai, nhưng ai cũng có thể tiếp cận."
            </p>
          </blockquote>
        </div>
      </section>

      <div className="max-w-[680px] mx-auto px-margin-mobile md:px-margin-desktop">
        <DialecticDivider variant="line" />
      </div>

      {/* Section II */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-headline-md text-headline-md text-primary italic mb-6">
            II. Tổng Hợp Qua Bất Đồng
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Chúng tôi không tìm kiếm sự đồng thuận; chúng tôi tìm kiếm sự tổng hợp. Sự va chạm của các quan điểm đối lập là lò rèn của trí tuệ. Kiến trúc của chúng tôi được thiết kế để tổ chức 'Hội Nghị Nửa Đêm' — một không gian nơi AI và nhận thức con người đan xen để giải cấu trúc các thực tại phức tạp thành các thành phần cơ bản.
          </p>
        </div>
      </section>

      <div className="max-w-[680px] mx-auto px-margin-mobile md:px-margin-desktop">
        <DialecticDivider variant="line" />
      </div>

      {/* Section III */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-headline-md text-headline-md text-primary italic mb-6">
            III. Tu Viện Số
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Faceless là thánh địa cho trí tuệ sáng suốt. Trong sự ồn ào của web hiện đại, chúng tôi mang đến sự tĩnh lặng. Thẩm mỹ của chúng tôi là đêm sâu, đồng tiền của chúng tôi là ngôn từ, và mục tiêu của chúng tôi là nâng tầm diễn ngôn toàn cầu thông qua sự truy vấn nghiêm cẩn, không ràng buộc.
          </p>
        </div>
      </section>

      {/* Core Tenets */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap">
        <div className="text-center mb-16">
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            Các Tín Điều Cốt Lõi
          </h2>
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em]">
            Tiên Đề Cho Kỷ Nguyên Mới
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {tenets.map((tenet, index) => (
            <div
              key={index}
              className={`p-8 border border-[#222222] group hover:border-primary transition-colors duration-300 ${
                index < 3 ? 'border-b-0 md:border-b' : ''
              } ${index % 3 !== 2 ? 'md:border-r-0' : ''}`}
            >
              <div className="font-display-lg text-headline-lg text-on-surface mb-2">{tenet.num}</div>
              <div className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4">
                {tenet.title}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">{tenet.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap text-center">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em] block mb-4">
          Kết
        </span>
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-12">
          Gia nhập sự tĩnh lặng. Bước vào hư vô. Trở nên vô diện.
        </h2>
        <Link
          href="/register"
          className="inline-block bg-primary text-[#0A0A0A] font-label-caps text-label-caps px-10 py-4 uppercase tracking-[0.2em] hover:brightness-110 transition-all"
        >
          Khởi Tạo Thành Viên
        </Link>
      </section>
    </div>
  )
}
