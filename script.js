/**
 * Enterprise Pulse - Dashboard Logic
 * Version 2.0.1 (2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // 1. Time and Date Clock
    const updateDateTime = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    };
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // 2. Dynamic Metric Updates
    let currentSales = 1248500;
    let activeUsers = 14292;

    const updateMetrics = () => {
        // Sales fluctuation
        currentSales += Math.floor(Math.random() * 2500) - 500;
        document.getElementById('sales-value').textContent = currentSales.toLocaleString();

        // Active user fluctuation
        activeUsers += Math.floor(Math.random() * 50) - 20;
        document.getElementById('active-users').textContent = activeUsers.toLocaleString();

        // Randomly update progress bars
        const fills = document.querySelectorAll('.progress-fill');
        fills.forEach(fill => {
            const currentWidth = parseInt(fill.style.width);
            const variation = Math.floor(Math.random() * 3) - 1;
            const newWidth = Math.min(100, Math.max(0, currentWidth + variation));
            fill.style.width = newWidth + '%';
            fill.previousElementSibling.lastElementChild.textContent = newWidth + '%';
        });
    };
    setInterval(updateMetrics, 3000);

    // 3. Global Map Visualization simulation
    const mapContainer = document.getElementById('map-container');
    const nodesCount = 12;
    const regions = [
        { name: 'North America', top: 30, left: 20 },
        { name: 'Europe', top: 25, left: 48 },
        { name: 'Asia Pacific', top: 35, left: 75 },
        { name: 'South America', top: 65, left: 32 },
        { name: 'Africa', top: 55, left: 52 },
        { name: 'Oceania', top: 75, left: 85 }
    ];

    const createMapNodes = () => {
        regions.forEach((region, index) => {
            const node = document.createElement('div');
            node.className = 'map-node';
            node.style.top = region.top + '%';
            node.style.left = region.left + '%';
            node.style.animationDelay = (index * 0.5) + 's';
            mapContainer.appendChild(node);
        });
    };
    createMapNodes();

    // 4. Internal Team Feed simulation
    const teamMessages = [
        { user: 'Alex Morgan', msg: 'New release deployed to staging. Testing underway.', initials: 'AM' },
        { user: 'Sarah Chen', msg: 'Sales target for EMEA hit 10 minutes ago! 🎉', initials: 'SC' },
        { user: 'Jordan Smith', msg: 'Routine maintenance window scheduled for midnight Sunday.', initials: 'JS' },
        { user: 'Maria Garcia', msg: 'Quarterly review slides are in the shared drive.', initials: 'MG' },
        { user: 'David Kim', msg: 'Customer feedback score is up to 4.9 this week.', initials: 'DK' },
        { user: 'Emma Wilson', msg: 'Internal hackathon starts in 2 hours. Get ready!', initials: 'EW' }
    ];

    const teamFeed = document.getElementById('team-feed');
    let feedIndex = 0;

    const addFeedItem = (data) => {
        const item = document.createElement('div');
        item.className = 'feed-item';
        const now = new Date();
        const timeStr = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

        item.innerHTML = `
            <div class="feed-user">
                <div class="avatar">${data.initials}</div>
                <span class="username">${data.user}</span>
                <span class="timestamp">Just now</span>
            </div>
            <p class="message">${data.msg}</p>
        `;

        teamFeed.prepend(item);

        // Limit to 5 items
        if (teamFeed.children.length > 5) {
            teamFeed.lastElementChild.remove();
        }
    };

    // Initial feed populate
    teamMessages.slice(0, 4).forEach(msg => addFeedItem(msg));

    // Rotate feed
    setInterval(() => {
        feedIndex = (feedIndex + 1) % teamMessages.length;
        addFeedItem(teamMessages[feedIndex]);
    }, 15000);

    // 5. Industry Headlines simulation
    const newsItems = [
        { label: 'Market', title: 'Global markets react to new sustainability protocols.' },
        { label: 'Tech', title: 'AI chip shortage predicted to ease by late 2026.' },
        { label: 'Economy', title: 'Consumer confidence reaches 5-year high in Q1.' },
        { label: 'Policy', title: 'New remote work regulations proposed by EU labor board.' }
    ];

    const newsTicker = document.getElementById('news-ticker');

    const populateNews = () => {
        newsItems.forEach(news => {
            const div = document.createElement('div');
            div.className = 'news-item';
            div.innerHTML = `
                <span class="news-label">${news.label}</span>
                <span class="news-title">${news.title}</span>
            `;
            newsTicker.appendChild(div);
        });
    };
    populateNews();

    // 6. Sparkline Simulation
    const canvas = document.getElementById('sales-sparkline');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const points = Array.from({length: 30}, () => Math.random() * 40 + 10);

        const drawSparkline = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.strokeStyle = '#c0392b';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';

            const step = canvas.width / (points.length - 1);

            ctx.moveTo(0, canvas.height - points[0]);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(i * step, canvas.height - points[i]);
            }
            ctx.stroke();

            // Add gradient fill
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(192, 57, 43, 0.2)');
            gradient.addColorStop(1, 'rgba(192, 57, 43, 0)');

            ctx.lineTo((points.length - 1) * step, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Update points for "live" feel
            points.shift();
            points.push(Math.random() * 40 + 10);
        };

        setInterval(drawSparkline, 2000);
        drawSparkline();
    }

    // Auto-refresh the page periodically (every 1 hour) to clear any potential memory leaks
    // Common practice for 24/7 digital signage apps
    setTimeout(() => {
        window.location.reload();
    }, 3600000);
});
