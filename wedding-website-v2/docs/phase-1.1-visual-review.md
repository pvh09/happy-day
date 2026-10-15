# Phase 1.1 — Visual rebuild

## Đối chiếu ảnh tham chiếu và Phase 1

| Hạng mục | Phase 1 | Bản rebuild |
| --- | --- | --- |
| Opening | Phong bì CSS phẳng, hoa Unicode, bố cục rộng | Thiệp giới hạn 390px, artwork giấy/phong bì/sáp có chất liệu, tên và nút HTML |
| Hero | Ảnh chân dung chú rể, bố cục lớn | Ảnh đôi thật từ gallery-10, tên trái / ảnh phải, hòa ivory, botanical trái |
| Timeline | Đường thẳng dashed | Đường Bézier SVG ngang desktop, dọc uốn lượn mobile, trái tim SVG trên đường, 5 Polaroid |
| Wedding details | 4 card có viền | 3 nhóm: lịch cưới, địa điểm, tiệc mừng; giữ đủ dữ liệu của cả 4 sự kiện |
| RSVP | Hoa Unicode, gradient | Pastel pink nhẹ, hai góc botanical, dusty rose button |
| Gallery | Lưới ảnh đồng cỡ | Lưới editorial ảnh lớn, giữ modal và chuyển ảnh |
| Tokens | Màu/font rải rác | Ivory #FFFCFA, pink #FBEAEC, blush #E8CCD1, rose #C9818E, charcoal #302C2C |

## Asset system

- `public/artwork/invitation.webp`: artwork được tạo riêng, phong bì giấy pastel và dấu sáp rose-gold có chiều sâu, hoa bất đối xứng. Không dùng ảnh mockup tham chiếu làm giao diện. Tên và các nút mở thiệp vẫn là HTML.
- `public/artwork/botanical.svg`: hoa nét mảnh tự vẽ bằng path, dùng cho hero và hai góc section.
- `public/artwork/paper.svg`: texture giấy nhẹ.
- `public/artwork/heart.svg`: trái tim timeline và divider.
- Không còn ký tự Unicode giả hoa hoặc phong bì CSS polygon.
- Không thiếu asset cần thiết cho bản rebuild này. Artwork phong bì và sáp được ghép trong một file WebP; không có animation tách nắp/sáp trong Phase 1.1.

## Nội dung được bảo toàn

`src/weddingData.ts` giữ nguyên. Không lấy ngày 14.03.2026, địa điểm hoặc mốc thời gian từ mockup làm dữ liệu thật. Tất cả ngày/địa điểm đang cập nhật tiếp tục hiển thị trạng thái cũ. RSVP chưa lưu dữ liệu, quà cưới chưa có QR/tài khoản; giữ thông báo trạng thái hiện có.

## Kiểm chứng

Chạy Vite với `npm run dev -- --port 5173`. Script `scripts/verify-visual.mjs` dùng Playwright và Chromium hệ thống; đặt `PLAYWRIGHT_MODULE` thành đường dẫn tuyệt đối tới `playwright/index.mjs` nếu chưa có module local, `CHROMIUM_PATH` nếu Chromium ở đường dẫn khác.

- Chromium: 1440×1000, 390×844, 320×740, 768×1024.
- Kiểm tra màn mở thiệp nằm trong viewport; mở được bằng nút thật.
- Đủ 5 cột mốc, 3 nhóm thông tin, 10 ảnh gallery; không ảnh lỗi, không tràn ngang, không chồng lấn giữa các cột mốc.
- Menu mobile mở/đóng; lightbox mở, next/previous, phím mũi tên, Escape; RSVP và mừng cưới mở/đóng đúng trạng thái.
- Không có lỗi JavaScript runtime trong các luồng trên.
- Ảnh thực tế: `screenshots/opening-1440.png`, `opening-390.png`, `main-1440.png`, `main-390.png`.
- Kết quả máy đọc được: `screenshots/verification.json`.
- `npm run typecheck`: PASS.
- `npm run build`: PASS.

## Giới hạn đối chiếu hình ảnh

Đã kiểm tra trực tiếp screenshot desktop/mobile và sửa lỗi chiều rộng opening trên màn 320px. Bố cục và palette theo ảnh mẫu; không tuyên bố khớp pixel. Ảnh đôi, họa tiết hoa và dấu sáp là tài nguyên của dự án/bản tạo riêng, khác tài nguyên gốc trong mockup. Font Playfair Display và Be Vietnam Pro hỗ trợ tiếng Việt, có fallback khi Google Fonts không truy cập được. Thông tin cưới chưa xác minh khiến chiều cao phần chi tiết khác mẫu.

Các kiểm tra kỹ thuật và chức năng trên PASS. Chưa đánh dấu nghiệm thu thị giác tổng thể Phase 1.1 PASS thay cho người dùng khi chưa xác nhận độ giống mong muốn.

## Bổ sung chuyển cảnh và độ mềm

- Chạm mở thiệp: khóa nhấn lặp, thiệp nâng nhẹ/zoom và dissolve trong 1,1 giây, hero fade-in theo thứ tự. Chuyển trọng tâm bàn phím sang trang chính sau khi hoàn tất.
- Section heading, Polaroid, chi tiết và gallery xuất hiện một lần khi cuộn qua bằng IntersectionObserver; chuyển động ngắn, easing chậm dần, không parallax liên tục.
- Menu sticky làm mờ nhẹ nền và đánh dấu section đang xem. Hover Polaroid, nút và lightbox dùng transition nhẹ.
- Reduced motion: bỏ animation, mở thiệp ngay và giữ nội dung hiển thị.
- Script kiểm chứng thêm trạng thái mở trung gian, toàn bộ scroll reveal và reduced motion. Ảnh trung gian: `screenshots/opening-transition-390.png`.
- Sửa TypeScript side-effect CSS import qua `src/vite-env.d.ts` tham chiếu `vite/client`.

Lệnh thiết lập công cụ kiểm chứng riêng (không thay dependency/lockfile ứng dụng):

```bash
npm install --prefix node_modules/.visual-tools --no-save --package-lock=false --cache node_modules/.cache playwright@1.64.1
PLAYWRIGHT_MODULE="$PWD/node_modules/.visual-tools/node_modules/playwright/index.mjs" node scripts/verify-visual.mjs
```

Cần Vite chạy ở port 5173 và Chromium có tại `/usr/bin/chromium`, hoặc đặt `CHROMIUM_PATH`. Công cụ kiểm chứng chỉ là tùy chọn khi chạy website bình thường trên Windows.
