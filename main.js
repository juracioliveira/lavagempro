// Particle Background System
const canvas = document.getElementById('particle-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * (canvas.width || window.innerWidth);
            this.y = Math.random() * (canvas.height || window.innerHeight);
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 242, 254, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.update();
            p.draw();

            for (let j = index + 1; j < particles.length; j++) {
                const dist = Math.hypot(p.x - particles[j].x, p.y - particles[j].y);
                if (dist < 150) {
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', initParticles);
    initParticles();
    animate();
}

// Initialize Lucide icons
lucide.createIcons();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Advanced Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a small delay based on index if items are in a grid
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Search Trigger Logic
const searchTrigger = document.getElementById('search-trigger');
const searchWrap = document.getElementById('search-input-wrap');
const searchInput = document.getElementById('global-search');

const searchIndex = [
    { title: "KYC - Know Your Customer", url: "compliance.html#kyx", tags: "cliente, identificação, cadastro, compliance" },
    { title: "UBO - Beneficiário Final", url: "compliance.html#kyx", tags: "proprietário, controle, empresa, ubo" },
    { title: "Esquema Loan-Back", url: "exemplos.html#engineering", tags: "empréstimo, offshore, evasão, métodos" },
    { title: "Smurfing / Fracionamento", url: "exemplos.html#financial", tags: "depósito, fracionado, banco, smurfing" },
    { title: "Mixer de Criptomoedas", url: "digital.html#crypto-mixers", tags: "bitcoin, anonimato, tumbler, digital, cripto" },
    { title: "Tornado Cash & Mixers", url: "digital.html#crypto-mixers", tags: "mistura, anonimato, tornado, cripto" },
    { title: "Análise de Vínculos (Link Analysis)", url: "investigacao.html#link-analysis", tags: "grafos, investigação, inteligência, vínculos" },
    { title: "SNA - Social Network Analysis", url: "investigacao.html#link-analysis", tags: "rede, grafos, nós, investigação" },
    { title: "COAF e BACEN", url: "compliance.html#regulation", tags: "órgãos, governo, brasil, regulação" },
    { title: "FATF / GAFI 40 Recomendações", url: "compliance.html#global-standards", tags: "internacional, regras, padrão, gafi" },
    { title: "NFT Wash Trading", url: "digital.html#nfts-wash", tags: "arte, digital, lavagem, nft" },
    { title: "Gaming & Skins Laundering", url: "digital.html#gaming-economies", tags: "jogos, skins, csgo, moedas, digital" },
    { title: "Paraísos Fiscais", url: "index.html#risk-map", tags: "offshore, bvi, sigilo, mapa" },
    { title: "Simulador de Estrutura", url: "index.html#simulator", tags: "ferramenta, teste, concha, simulador" },
    { title: "Consultoria Compliance", url: "contato.html", tags: "contratar, suporte, ajuda, contato" }
];

if (searchTrigger) {
    searchTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        searchWrap.classList.toggle('hidden');
        if (!searchWrap.classList.contains('hidden')) {
            searchInput.focus();
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        let resultsHTML = '';

        if (query.length > 1) {
            const results = searchIndex.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.tags.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                resultsHTML = '<div class="search-results-dropdown">';
                results.forEach(res => {
                    resultsHTML += `<a href="${res.url}">${res.title}</a>`;
                });
                resultsHTML += '</div>';
            }
        }

        const existingResults = document.querySelector('.search-results-dropdown');
        if (existingResults) existingResults.remove();
        if (resultsHTML) searchWrap.insertAdjacentHTML('beforeend', resultsHTML);
    });
}



// Risk Map Logic
function updateMap(filter) {
    document.querySelectorAll('.map-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.map-node').forEach(node => {
        if (node.classList.contains(filter)) {
            node.style.display = 'block';
        } else {
            node.style.display = 'none';
        }
    });
}

document.querySelectorAll('.map-node').forEach(node => {
    node.addEventListener('mouseenter', () => {
        document.getElementById('country-name').textContent = node.getAttribute('data-country');
        document.getElementById('country-desc').textContent = node.getAttribute('data-info');
    });
});

// Shell Simulator Logic
function calculateSim() {
    const loc = parseInt(document.getElementById('sim-loc').value);
    const type = parseInt(document.getElementById('sim-type').value);
    const layers = parseInt(document.getElementById('sim-layers').value);

    const total = (loc + type + layers) / 2.6;
    const scoreVal = Math.min(Math.round(total), 100);

    document.getElementById('sim-score').classList.remove('hidden');
    document.getElementById('score-val').textContent = scoreVal + "%";

    let text = "";
    if (scoreVal < 40) text = "Baixa Complexidade: Facilmente detectável por sistemas de monitoramento padrão.";
    else if (scoreVal < 75) text = "Média Complexidade: Exige investigação cross-border para identificar o UBO.";
    else text = "Alta Complexidade: Estrutura desenhada para obscurecimento total. Detecção improvável sem cooperação internacional.";

    document.getElementById('score-text').textContent = text;
    drawStructure(layers);
}

function drawStructure(layers) {
    const canvas = document.getElementById('sim-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const startY = 40;
    const stepY = 50;

    ctx.strokeStyle = '#00f2fe';
    ctx.fillStyle = '#00f2fe';
    ctx.lineWidth = 1.5;
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';

    // UBO
    ctx.beginPath();
    ctx.arc(centerX, startY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("UBO", centerX, startY - 15);

    let currentY = startY;
    for (let i = 1; i <= layers; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, currentY + 8);
        ctx.lineTo(centerX, currentY + stepY - 12);
        ctx.stroke();

        currentY += stepY;
        ctx.strokeRect(centerX - 30, currentY - 12, 60, 24);
        ctx.fillText(`CAMADA ${i}`, centerX, currentY + 4);
    }
}

// Sanctions Radar Feed Simulator
function updateSanctions() {
    const news = [
        "GAFI: Nigéria removida da lista cinza após reformas estruturais.",
        "OFAC: Novas sanções contra rede russa de lavagem via cripto.",
        "COAF: Volume de ROS aumenta 35% no último trimestre bancário.",
        "UE: Aprova regulamento rigoroso para VASPs e Self-custody wallets.",
        "BVI: Implementa registro público de beneficiários finais."
    ];
    const feed = document.getElementById('sanctions-feed');
    if (!feed) return;

    let i = 0;
    setInterval(() => {
        feed.style.opacity = '0';
        setTimeout(() => {
            feed.textContent = news[i];
            feed.style.opacity = '1';
            i = (i + 1) % news.length;
        }, 500);
    }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateSanctions();
});

// Advanced Quiz / Investigation Challenge
const quizScenarios = [
    {
        title: "Cenário: Depósito em Espécie",
        question: "Um novo cliente (Consultoria) tenta depositar R$ 500.000,00 em dinheiro vivo no primeiro dia de conta. Qual a conduta?",
        options: [
            { text: "Aceitar, pois é receita declarada.", correct: false },
            { text: "Recusar e reportar ROS imediato ao COAF.", correct: true },
            { text: "Fracionar o valor em depósitos menores.", correct: false }
        ],
        explanation: "Depósitos vultosos em espécie sem origem clara são o maior Red Flag da fase de Colocação. Facilitar o fracionamento é cumplicidade criminosa."
    },
    {
        title: "Cenário: Transferência Internacional",
        question: "Uma empresa recebe transferências repetidas de paraísos fiscais que são imediatamente enviadas para terceiros. O que isso indica?",
        options: [
            { text: "Operação normal de arbitragem.", correct: false },
            { text: "Tipologia de 'Pass-through' (Conta de Passagem).", correct: true },
            { text: "Eficiência financeira internacional.", correct: false }
        ],
        explanation: "Contas de passagem são usadas na fase de Ocultação para quebrar o rastro entre a origem e o destino final dos fundos."
    },
    {
        title: "Cenário: Ativos Virtuais",
        question: "Um cliente movimenta altos valores em criptoativos vindos de um serviço de 'Mixer'. Qual o risco?",
        options: [
            { text: "Risco de anonimato deliberado (Ocultação).", correct: true },
            { text: "Nenhum, cripto é o futuro.", correct: false },
            { text: "Apenas risco de volatilidade do mercado.", correct: false }
        ],
        explanation: "O uso de Mixers/Tumblers é um forte indício de tentativa de quebrar o rastro na blockchain, exigindo Diligência Aumentada (EDD)."
    }
];

let currentScenarioIndex = 0;

function updateQuizUI() {
    const scenario = quizScenarios[currentScenarioIndex];
    const quizScreen = document.getElementById('quiz-screen');
    if (!quizScreen) return;

    quizScreen.innerHTML = `
        <div class="quiz-question">
            <span class="q-count">Cenário ${currentScenarioIndex + 1}/${quizScenarios.length}</span>
            <h4 style="color:var(--primary);margin-bottom:0.5rem;">${scenario.title}</h4>
            <h3>${scenario.question}</h3>
        </div>
        <div class="quiz-options">
            ${scenario.options.map((opt, idx) => `
                <button class="quiz-btn" onclick="checkQuiz(${opt.correct})">${opt.text}</button>
            `).join('')}
        </div>
    `;
    lucide.createIcons();
}

function checkQuiz(isCorrect) {
    const scenario = quizScenarios[currentScenarioIndex];
    if (isCorrect) {
        document.getElementById('quiz-screen').classList.add('hidden');
        const resultSection = document.getElementById('quiz-result');
        resultSection.classList.remove('hidden');
        resultSection.querySelector('p').textContent = scenario.explanation;

        const btnContainer = resultSection.querySelector('.result-footer') || resultSection;

        if (currentScenarioIndex < quizScenarios.length - 1) {
            resultSection.querySelector('.report-btn').textContent = "Próximo Cenário";
            resultSection.querySelector('.report-btn').setAttribute('onclick', 'nextScenario()');
        } else {
            resultSection.querySelector('.report-btn').textContent = "Reiniciar Desafio";
            resultSection.querySelector('.report-btn').setAttribute('onclick', 'resetQuiz()');
        }
    } else {
        alert("Resposta Incorreta. Analise os sinais de alerta (Red Flags) e a legislação vigente.");
    }
}

function nextScenario() {
    currentScenarioIndex++;
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    updateQuizUI();
}

function resetQuiz() {
    currentScenarioIndex = 0;
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    updateQuizUI();
}

window.addEventListener('DOMContentLoaded', () => {
    updateQuizUI();
    updateSanctions();
});

// Checklist / Risk Meter Logic
const checkboxes = document.querySelectorAll('.check-item input');
const riskSpan = document.querySelector('#risk-meter span');

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.check-item input:checked').length;
        if (checkedCount === 0) {
            riskSpan.textContent = "Selecione os itens";
            riskSpan.style.color = "var(--primary)";
        } else if (checkedCount <= 2) {
            riskSpan.textContent = "RISCO BAIXO - Monitorar";
            riskSpan.style.color = "#4ade80";
        } else if (checkedCount === 3) {
            riskSpan.textContent = "RISCO MÉDIO - Diligência Aumentada";
            riskSpan.style.color = "#facc15";
        } else {
            riskSpan.textContent = "ALTO RISCO - Bloqueio Recomendado";
            riskSpan.style.color = "#ff4e4e";
        }
    });
});

// Accordion Toggle
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer Initialization
document.querySelectorAll('.phase-item, .card, .impact-item, .prev-card, .detail-list li, .accordion-item, .tech-item, .flag, .norm-card, .timeline-node, .sanction-card, .safety-card, .crit-box, .prec-box, .tech-card-modern, .network-item, .stats-infographic, .cyber-card, .report-box, .method-card, .flow-step, .alert-box-warning, .tool-card, .quiz-container, .checklist-box, .evasão-card, .step-point, .resource-card, .risk-map-widget, .simulator-box, .wiki-card, .contact-info-panel, .contact-form-wrap, .stat-box, .pain-card, .step-item, .testimonial-card, .cta-banner, .cta-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
    observer.observe(el);
});

// Risk Report Generation
function generateReport() {
    const checkedCount = document.querySelectorAll('.check-item input:checked').length;
    const riskLevel = document.querySelector('#risk-meter span').textContent;
    const date = new Date().toLocaleDateString('pt-BR');

    let reportText = `
        RELATÓRIO DE ANÁLISE DE RISCO - LAVAGEMPRO
        Data: ${date}
        Classificação: ${riskLevel}
        Pontos de Atenção: ${checkedCount} indicadores detectados.
        
        PARECER TÉCNICO:
        ${checkedCount > 3 ?
            "RECOMENDAÇÃO: Bloqueio imediato para análise profunda. Nível de risco incompatível com políticas padrão de apetite a risco. Necessário reportar à Unidade de Inteligência Financeira." :
            checkedCount > 1 ?
                "RECOMENDAÇÃO: Aplicar Diligência Aumentada (EDD). Monitorar transações nos próximos 90 dias e validar SoF (Source of Funds)." :
                "RECOMENDAÇÃO: Prosseguir com o cadastro padrão. Manter o ciclo de monitoramento periódico (CDD)."}
    `;

    alert(reportText + "\n\n(Simulação: Em um ambiente real, este arquivo seria gerado em PDF com assinatura digital)");
}
