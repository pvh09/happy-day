/** DỮ LIỆU DEMO — Tên có từ source gốc; lịch cưới/địa điểm chưa được xác minh nên không tự điền. */
export const weddingData = {
  couple: { groom: 'Long Vũ', bride: 'Thanh Thuý', fullGroom: 'Phùng Đặng Long Vũ', fullBride: 'Phùng Thị Thanh Thuý' },
  date: null as string | null,
  invitation: 'Trân trọng kính mời bạn cùng gia đình đến chung vui trong ngày hạnh phúc của chúng mình.',
  storyIntro: 'Mỗi câu chuyện tình yêu đều có những khoảnh khắc đáng nhớ. Và đây là hành trình của chúng mình…',
  milestones: [
    { title: 'Lần đầu gặp nhau', date: 'Đang cập nhật', description: 'Nơi câu chuyện của chúng mình bắt đầu.', image: '/images/story-1.jpg' },
    { title: 'Bắt đầu hẹn hò', date: 'Đang cập nhật', description: 'Những ngày tháng cùng nhau trưởng thành.', image: '/images/story-2.jpg' },
    { title: 'Lời cầu hôn', date: 'Đang cập nhật', description: 'Một lời hẹn ước cho hành trình phía trước.', image: '/images/story-3.jpg' },
    { title: 'Lễ đính hôn', date: 'Đang cập nhật', description: 'Hai trái tim, một lời hứa.', image: '/images/story-4.jpg' },
    { title: 'Ngày thành đôi', date: 'Đang cập nhật', description: 'Một chương mới của tình yêu.', image: '/images/couple.jpg' }
  ],
  events: [
    { title: 'Tiệc cưới nhà trai', time: 'Đang cập nhật', venue: 'Địa điểm đang cập nhật', address: '', mapUrl: '' },
    { title: 'Tiệc cưới nhà gái', time: 'Đang cập nhật', venue: 'Địa điểm đang cập nhật', address: '', mapUrl: '' },
    { title: 'Lễ cưới nhà gái', time: 'Đang cập nhật', venue: 'Địa điểm đang cập nhật', address: '', mapUrl: '' },
    { title: 'Lễ cưới nhà trai', time: 'Đang cập nhật', venue: 'Địa điểm đang cập nhật', address: '', mapUrl: '' }
  ],
  gallery: Array.from({ length: 10 }, (_, i) => `/images/gallery-${i + 1}.jpg`),
  gift: { groomQr: null as string | null, brideQr: null as string | null },
  music: null as string | null
};
