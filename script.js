// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Scroll-triggered fade-in-sp
const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible-sp');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up-sp').forEach(el => observer1.observe(el));

// Nav shrink on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Form submission
function handleSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
    e.target.reset();
}



// 1. Lấy phần tử khung chọn giờ
const timeSection = document.querySelector('.time-section');
// Lấy tất cả các ô nút bấm chọn giờ để lát nữa xử lý bật/tắt
const timeSlots = document.querySelectorAll('.time-slot-btn');

// 2. Mặc định làm mờ và khóa bấm ban đầu
timeSection.style.opacity = '0.3';
timeSection.style.pointerEvents = 'none';

// 3. Kích hoạt Flatpickr
flatpickr("#datepicker", {
    locale: "ja",
    dateFormat: "Y年m月d日",
    minDate: new Date().fp_incr(2),
    maxDate: new Date().fp_incr(60),
    // 🚀 THÊM DÒNG NÀY ĐỂ KÍCH HOẠT LẠI REQUIRED CỦA HTML5
    // allowInput: false,
    disable: [
        function (date) {
            return (date.getDay() === 0); // Nghỉ Chủ Nhật
        }
    ],

    onChange: function (selectedDates, dateStr, instance) {
        if (selectedDates.length > 0) {
            // Kỹ thuật 1: Mở khóa hiện khung chọn giờ
            timeSection.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
            timeSection.style.opacity = '1';
            timeSection.style.pointerEvents = 'auto';

            // 🚀 Kỹ thuật 2: Giả lập (Mockup) dữ liệu trống/đầy để test
            // Trước khi giả lập, ta cần reset lại tất cả các nút về trạng thái trống (mở khóa)
            timeSlots.forEach(slot => {
                const radio = slot.querySelector('input[type="radio"]');
                radio.disabled = false;
                slot.classList.remove('is-full');
            });

            // GIẢ LẬP TÌNH HUỐNG: 
            // Nếu khách chọn bất kỳ ngày nào có số "5" hoặc "0" ở cuối (Ví dụ: ngày 5, 10, 15, 20, 25, 30)
            // Ta sẽ giả vờ như ca đầu tiên (10:00 - 12:00) đã bị ĐẦY CHỖ (満席)
            if (dateStr.includes("5日") || dateStr.includes("0日")) {
                const firstSlot = timeSlots[0]; // Lấy ô 10:00
                const radioInput = firstSlot.querySelector('input[type="radio"]');

                radioInput.disabled = true;       // Khóa không cho click chọn
                radioInput.checked = false;        // Bỏ chọn nếu lỡ dính
                firstSlot.classList.add('is-full'); // Thêm class để CSS làm mờ/gạch chéo
            }
        }
    }
});
// // Giả sử thẻ <form> của bạn có id="reservation-form"
// const form = document.getElementById('reservationForm');
// const dateInput = document.getElementById('datepicker');

// form.addEventListener('submit', function (event) {
//     // Nếu giá trị của ô chọn ngày trống rỗng
//     if (dateInput.value === "") {
//         event.preventDefault(); // 🛑 CHẶN KHÔNG CHO GỬI FORM ĐI
//         // 🔥 MẸO ĐỒNG BỘ: Ép trình duyệt phải lôi bong bóng "required" mặc định lên màn hình
//         dateInput.reportValidity();
//         // Bạn có thể alert hoặc đổi màu viền ô lịch thành màu đỏ để nhắc nhở khách
//         // dateInput.style.borderColor = "#ff4d4d";
//         // alert("ご来店希望日を選択してください。(Vui lòng chọn ngày mong muốn)");
//     }
// });