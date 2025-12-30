// ============================================
// TEMPLATES - SMS and Tickets
// ============================================
const Templates = {
    getSMS(industry, businessName, total, currency) {
        const templates = {
            // FOOD
            restaurant: `<div class="sms-content">G'day! 🎉<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Thanks mate! See you soon! 🙏</div>`,
            pizza: `<div class="sms-content">Bellissimo! 🍕<br><br>Your pizza order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Your delicious pizza is on its way! 🛵</div>`,
            bakery: `<div class="sms-content">Fresh from the oven! 🥐<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>See you soon!</div>`,
            coffeeshop: `<div class="sms-content">☕ Coffee's brewing!<br><br>Your order from <strong>${businessName}</strong> is ready soon!<br><br><strong>Total:</strong> ${currency}${total}<br><br>See you in a few!</div>`,
            sushi: `<div class="sms-content">🍣 Arigatou!<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Enjoy your meal!</div>`,
            fastfood: `<div class="sms-content">🍔 Order up!<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Ready soon!</div>`,
            icecream: `<div class="sms-content">🍦 Sweet!<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br><strong>Total:</strong> ${currency}${total}<br><br>Deliciousness awaits!</div>`,
            // HEALTH/BEAUTY
            salon: `<div class="sms-content">Hey gorgeous! 💇‍♀️<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>Can't wait to make you look fabulous! ✨</div>`,
            medical: `<div class="sms-content">Hello,<br><br>Your appointment at <strong>${businessName}</strong> is confirmed.<br><br>Please arrive 10 minutes early. 🏥</div>`,
            dental: `<div class="sms-content">Hello! 🦷<br><br>Your dental appointment at <strong>${businessName}</strong> is confirmed!<br><br>See you soon for a brighter smile!</div>`,
            vet: `<div class="sms-content">Hello! 🐾<br><br>Your pet's appointment at <strong>${businessName}</strong> is confirmed!<br><br>See you and your furry friend soon! 🐕</div>`,
            spa: `<div class="sms-content">Namaste 🧘<br><br>Your relaxation awaits at <strong>${businessName}</strong>!<br><br>Pure bliss awaits... ✨</div>`,
            pharmacy: `<div class="sms-content">Hello! 💊<br><br>Your prescription at <strong>${businessName}</strong> is ready!<br><br>See you soon!</div>`,
            optician: `<div class="sms-content">👁️ See you soon!<br><br>Your eye exam at <strong>${businessName}</strong> is confirmed!<br><br>Looking forward to it!</div>`,
            podiatrist: `<div class="sms-content">🦶 Appointment confirmed!<br><br>Your visit to <strong>${businessName}</strong> is booked!<br><br>We'll have you walking happy!</div>`,
            massage: `<div class="sms-content">💆 Relax & unwind!<br><br>Your massage at <strong>${businessName}</strong> is confirmed!<br><br>Bliss awaits...</div>`,
            nailsalon: `<div class="sms-content">💅 Gorgeous nails incoming!<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>See you soon!</div>`,
            // SERVICES
            garage: `<div class="sms-content">G'day mate! 🔧<br><br>Your service at <strong>${businessName}</strong> is confirmed!<br><br>She'll be right! 🚗</div>`,
            cleaning: `<div class="sms-content">✨ Sparkle incoming!<br><br>Your cleaning service from <strong>${businessName}</strong> is confirmed!<br><br>Your place will shine!</div>`,
            electrician: `<div class="sms-content">⚡ Sparky's coming!<br><br>Your job with <strong>${businessName}</strong> is confirmed!<br><br>We'll get you powered up!</div>`,
            plumber: `<div class="sms-content">🔧 Help is coming!<br><br>Your job with <strong>${businessName}</strong> is confirmed!<br><br>We'll fix it right!</div>`,
            landscaping: `<div class="sms-content">🌳 Garden time!<br><br>Your service with <strong>${businessName}</strong> is confirmed!<br><br>Your yard will look amazing!</div>`,
            moving: `<div class="sms-content">🚚 Moving day booked!<br><br>Your move with <strong>${businessName}</strong> is confirmed!<br><br>Stress-free relocation ahead!</div>`,
            locksmith: `<div class="sms-content">🔐 Help is on the way!<br><br><strong>${businessName}</strong> has dispatched a locksmith!<br><br>ETA: 15-30 minutes</div>`,
            // PROFESSIONAL
            hotel: `<div class="sms-content">Welcome! 🏨<br><br>Your reservation at <strong>${businessName}</strong> is confirmed!<br><br>Safe travels! ✨</div>`,
            gym: `<div class="sms-content">Let's go! 💪<br><br>You're all set at <strong>${businessName}</strong>!<br><br>See you at the gym! 🏋️</div>`,
            lawyer: `<div class="sms-content">Good day,<br><br>Your consultation at <strong>${businessName}</strong> is confirmed.<br><br>Kind regards ⚖️</div>`,
            realestate: `<div class="sms-content">Exciting news! 🏠<br><br>Your property viewing with <strong>${businessName}</strong> is confirmed!<br><br>See you there! 🔑</div>`,
            // LIFESTYLE
            florist: `<div class="sms-content">🌹 Beautiful blooms!<br><br>Your order from <strong>${businessName}</strong> is confirmed!<br><br>Blooming lovely!</div>`,
            photography: `<div class="sms-content">📸 Say cheese!<br><br>Your session at <strong>${businessName}</strong> is confirmed!<br><br>Can't wait to capture the magic!</div>`,
            tattoo: `<div class="sms-content">🎨 Let's create art!<br><br>Your appointment at <strong>${businessName}</strong> is confirmed!<br><br>Get ready for something amazing!</div>`,
            petgrooming: `<div class="sms-content">🐩 Pamper time!<br><br>Your pet's grooming at <strong>${businessName}</strong> is confirmed!<br><br>They'll look fabulous!</div>`,
            petboarding: `<div class="sms-content">🐾 Holiday booked!<br><br>Your pet's stay at <strong>${businessName}</strong> is confirmed!<br><br>They'll have a blast!</div>`,
            daycare: `<div class="sms-content">👶 Enrollment confirmed!<br><br>Your child's spot at <strong>${businessName}</strong> is reserved!<br><br>Welcome to the family!</div>`,
            wedding: `<div class="sms-content">💍 Congratulations!<br><br>Your consultation with <strong>${businessName}</strong> is confirmed!<br><br>Let's plan your dream day! 💒</div>`,
            eventvenue: `<div class="sms-content">🎭 Event booked!<br><br>Your viewing at <strong>${businessName}</strong> is confirmed!<br><br>Can't wait to show you around!</div>`,
            // OTHER
            drivingschool: `<div class="sms-content">🚗 Lesson booked!<br><br>Your driving lesson with <strong>${businessName}</strong> is confirmed!<br><br>You'll be cruising soon!</div>`,
            tutoring: `<div class="sms-content">📚 Learning awaits!<br><br>Your tutoring session with <strong>${businessName}</strong> is confirmed!<br><br>Success is ahead!</div>`
        };
        return templates[industry] || templates.restaurant;
    },

    getTicket(industry, orderNum, total, currency) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });

        const icons = {
            restaurant: '🍽️',
            pizza: '🍕',
            bakery: '🥐',
            coffeeshop: '☕',
            sushi: '🍣',
            fastfood: '🍔',
            icecream: '🍦',
            salon: '💇',
            medical: '🏥',
            dental: '🦷',
            vet: '🐾',
            spa: '🧘',
            pharmacy: '💊',
            optician: '👁️',
            podiatrist: '🦶',
            massage: '💆',
            nailsalon: '💅',
            garage: '🔧',
            cleaning: '✨',
            electrician: '⚡',
            plumber: '🔧',
            landscaping: '🌳',
            moving: '🚚',
            locksmith: '🔐',
            hotel: '🏨',
            gym: '🏋️',
            lawyer: '⚖️',
            realestate: '🏠',
            florist: '💐',
            photography: '📷',
            tattoo: '🎨',
            petgrooming: '🐩',
            petboarding: '🐈',
            daycare: '👶',
            wedding: '💒',
            eventvenue: '🎭',
            drivingschool: '🚗',
            tutoring: '📚'
        };
        const icon = icons[industry] || '📋';

        const isBooking = [
            'salon',
            'medical',
            'dental',
            'vet',
            'spa',
            'massage',
            'nailsalon',
            'optician',
            'podiatrist',
            'hotel',
            'gym',
            'lawyer',
            'photography',
            'tattoo',
            'petgrooming',
            'wedding',
            'eventvenue',
            'drivingschool',
            'tutoring',
            'daycare',
            'petboarding'
        ].includes(industry);
        const isService = [
            'cleaning',
            'electrician',
            'plumber',
            'landscaping',
            'moving',
            'locksmith',
            'garage',
            'realestate'
        ].includes(industry);

        let ticketType = 'ORDER';
        if (isBooking) ticketType = 'BOOKING';
        if (isService) ticketType = 'JOB';
        if (industry === 'locksmith') ticketType = 'DISPATCH';

        return `<div class="ticket-content">
            <h4>${icon} ${ticketType} #${orderNum}</h4>
            <p style="text-align:center;color:#666;font-size:0.75rem;">${time}</p>
            <div class="ticket-item"><span>${isBooking ? 'Appointment:' : 'Items:'}</span><span>✓</span></div>
            ${total > 0 ? `<div class="ticket-item"><span>Total:</span><span>${currency}${total}</span></div>` : ''}
            <p style="text-align:center;margin-top:0.5rem;font-weight:bold;">*** CONFIRMED ***</p>
        </div>`;
    }
};

window.Templates = Templates;
