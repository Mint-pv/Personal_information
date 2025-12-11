document.addEventListener('DOMContentLoaded', () => {
    // 1. Logic สำหรับ "นายเอกราช ลุนณี" ใต้รูป
    const nameToDisplay = "นายเอกราช ลุนณี";
    const nameDisplay = document.querySelector('.name-display');
    const rotatingImage = document.querySelector('.rotating-image');

    // [แก้ไข] ล้างเนื้อหาเก่าทั้งหมดก่อนสร้างใหม่ เพื่อป้องกันการแสดงผลซ้ำ
    nameDisplay.innerHTML = ''; 

    // สร้างตัวอักษรทีละตัวใน DOM
    nameToDisplay.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.classList.add('bounce-char');
        span.textContent = char === ' ' ? '\u00A0' : char; 
        nameDisplay.appendChild(span);

        // ให้ตัวอักษรโผล่มา (Animation เด้งดึ๋งในตอนเริ่มต้น)
        setTimeout(() => {
            span.style.opacity = 1;
            span.style.transform = 'translateY(0)';
            // ลบ transform หลังจบ animation เริ่มต้น 
            setTimeout(() => {
                span.style.transform = 'none';
            }, 500); 
        }, 500 + index * 100);
    });

    // Event: เมื่อเมาส์ชี้ที่รูปภาพ (ทำให้ตัวอักษรหมุน 360 องศา)
    rotatingImage.addEventListener('mouseenter', () => {
        document.querySelectorAll('.bounce-char').forEach((char, index) => {
            // [MODIFIED] ลบ animation เก่าและเพิ่ม animation ใหม่
            char.style.animation = 'none'; // ต้องรีเซ็ตก่อนเริ่มใหม่
            char.offsetWidth; // Force reflow
            
            // ใช้ setTimeout เพื่อดีเลย์การหมุนทีละตัว
            setTimeout(() => {
                // ให้ตัวอักษรหมุน 360 องศาและสว่างขึ้น
                char.classList.add('char-is-rotating');
                char.style.animation = `char-full-rotate 0.6s ease-out 1 forwards, rainbow-shift 1s linear infinite`;
                char.style.filter = 'brightness(1.2)';

            }, index * 50); 
        });
    });

    // Event: เมื่อเมาส์ออกจากรูปภาพ (หยุดหมุนและกลับสู่ตำแหน่งเดิม)
    rotatingImage.addEventListener('mouseleave', () => {
        document.querySelectorAll('.bounce-char').forEach(char => {
            // [MODIFIED] ลบ class และรีเซ็ต transform/filter ด้วย transition
            char.classList.remove('char-is-rotating');
            char.style.animation = `rainbow-shift 15s linear infinite`; // กลับไปใช้ animation สีรุ้งช้าๆ
            char.style.transform = 'none'; // กลับสู่ตำแหน่ง 0 องศา
            char.style.filter = 'brightness(0.6)'; // กลับสู่ความมืดเดิม
        });
    });

    // 2. Logic สำหรับ Scroll Snap Delay 
    // ใช้ CSS scroll-snap-type + scroll-behavior: smooth แทน JS
});