// ============================================
// NAVBAR - AUTO HIDE (VERSÃO TESTADA)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado!');
    
    const navbar = document.querySelector('.navbar-m33');
    console.log('Navbar encontrada:', navbar);
    
    if (!navbar) {
        console.log('ERRO: Navbar não encontrada!');
        return;
    }

    let ultimaPosicao = window.scrollY;

    function controlarNavbar() {
        const posicaoAtual = window.scrollY;
        
        console.log('Scroll:', posicaoAtual); // MOSTRA NO CONSOLE
        
        // Se estiver no topo (menos de 50px), mostra sempre
        if (posicaoAtual < 50) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            ultimaPosicao = posicaoAtual;
            return;
        }

        // Descendo → esconde
        if (posicaoAtual > ultimaPosicao && posicaoAtual > 100) {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0';
            console.log('➡️ ESCONDEU');
        } 
        // Subindo → mostra
        else if (posicaoAtual < ultimaPosicao) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            console.log('⬅️ MOSTROU');
        }

        ultimaPosicao = posicaoAtual;
    }

    // Executa ao rolar
    window.addEventListener('scroll', controlarNavbar);

    // Executa uma vez ao carregar
    controlarNavbar();

    // ============================================
    // MENU MOBILE (HAMBURGER)
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        console.log('Menu toggle encontrado!');
        
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            console.log('Menu toggled:', navMenu.classList.contains('active'));
        });

        document.querySelectorAll('.nav-menu-m33 .nav-link a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    } else {
        console.log('Menu toggle não encontrado!');
        console.log('menuToggle:', menuToggle);
        console.log('navMenu:', navMenu);
    }
});


// ============================================
// TESTE: NAVBAR AUTO-HIDE (VERSÃO SIMPLES)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript carregado!');
    
    const navbar = document.querySelector('.navbar-m33');
    console.log('Navbar encontrada:', navbar);
    
    if (!navbar) {
        console.log('Navbar NÃO encontrada!');
        return;
    }

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        console.log('Scroll:', currentScrollY);

        if (currentScrollY < 50) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            console.log('Mostrando navbar (topo)');
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0';
            console.log('Escondendo navbar (descendo)');
        } else if (currentScrollY < lastScrollY) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            console.log('Mostrando navbar (subindo)');
        }

        lastScrollY = currentScrollY;
    });


    // ============================================
    // MENU MOBILE (HAMBURGER) - CORRIGIDO
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            // Muda o ícone do hamburger
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Fecha ao clicar em um link
        document.querySelectorAll('.nav-menu-m33 .nav-link a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        // Fecha ao clicar fora
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
});

// ============================================
// CARROSSEL PRINCIPAL (CELULAR)
// ============================================
(function() {
    const slidesContainer = document.getElementById('carouselSlides');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dots-container .dot');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let intervalId;

    if (!slidesContainer || slides.length === 0) {
        console.log('Carrossel não encontrado');
        return;
    }

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;
        slidesContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        slidesContainer.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        updateDots();
    }

    function updateDots() {
        dots.forEach(function(dot, i) {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function startAutoplay() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 4000);
    }

    function resetAutoplay() {
        clearInterval(intervalId);
        startAutoplay();
    }

    const wrapper = document.getElementById('phoneWrapper');
    if (!wrapper) {
        console.log('phoneWrapper não encontrado');
        return;
    }

    // Touch events
    wrapper.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(intervalId);
    }, { passive: true });

    wrapper.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        let diff = startX - e.touches[0].clientX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) goToSlide(currentIndex + 1);
            else goToSlide(currentIndex - 1);
            isDragging = false;
            resetAutoplay();
        }
    }, { passive: true });

    wrapper.addEventListener('touchend', function() {
        isDragging = false;
        resetAutoplay();
    }, { passive: true });

    // Mouse events
    wrapper.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        isDragging = true;
        clearInterval(intervalId);
    });

    wrapper.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        let diff = startX - e.clientX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) goToSlide(currentIndex + 1);
            else goToSlide(currentIndex - 1);
            isDragging = false;
            resetAutoplay();
        }
    });

    wrapper.addEventListener('mouseup', function() {
        isDragging = false;
        resetAutoplay();
    });

    wrapper.addEventListener('mouseleave', function() {
        isDragging = false;
        resetAutoplay();
    });

    // Botões
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        });
    }

    // Dots
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
            resetAutoplay();
        });
    });

    // Inicializa
    updateDots();
    startAutoplay();
})();

// ============================================
// ANIMAÇÃO: ELEMENTOS SOBEM AO ROLAR
// ============================================
(function() {
    const elementosParaSubir = document.querySelectorAll(
        '.phone-container, ' +
        '.cardapio-phone-container, ' +
        '.agilize-imagem-wrapper, ' +
        '.sistema-imagem-wrapper, ' +
        '.agilize-chat-wrapper'
    );

    function revelarElementos() {
        elementosParaSubir.forEach(function(el) {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revelarElementos);
    setTimeout(revelarElementos, 500);
    window.addEventListener('resize', revelarElementos);
})();

// ============================================
// ANIMAÇÃO: SISTEMA COMPLETO
// ============================================
(function() {
    const sistemaImagem = document.getElementById('sistemaImagem');

    function revelarSistema() {
        if (!sistemaImagem) return;
        const rect = sistemaImagem.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 80) {
            sistemaImagem.classList.add('visible');
        }
    }

    window.addEventListener('scroll', revelarSistema);
    setTimeout(revelarSistema, 500);
    window.addEventListener('resize', revelarSistema);
})();

// ============================================
// FAQ ACORDEON
// ============================================
(function() {
    const accordionItems = document.querySelectorAll('.faq-accordion-item');

    accordionItems.forEach(function(item) {
        const btn = item.querySelector('.faq-accordion-btn');

        if (btn) {
            btn.addEventListener('click', function() {
                // Fecha todos os outros itens
                accordionItems.forEach(function(otherItem) {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Alterna o item clicado
                item.classList.toggle('active');
            });
        }
    });

    // Abre o primeiro item por padrão
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
})();

// ============================================
// NAVBAR - AUTO HIDE (SIMPLES E FUNCIONAL)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-m33');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 100) {
            // Se está descendo
            if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.opacity = '0';
            } 
            // Se está subindo
            else {
                navbar.style.transform = 'translateY(0)';
                navbar.style.opacity = '1';
            }
        } 
        // Se está no topo
        else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // MENU MOBILE (HAMBURGER)
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-menu-m33 .nav-link a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ADICIONE ESTE CÓDIGO NO SEU JS
document.addEventListener('DOMContentLoaded', function() {
    const kdsImage = document.querySelector('.kds-imagem-wrapper');
    
    // CRIA UM OBSERVADOR
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                kdsImage.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2 // ATIVA QUANDO 20% DO ELEMENTO ESTIVER VISÍVEL
    });
    
    observer.observe(kdsImage);
});

// ============================================
// PLANOS - ABAS MENSAL / ANUAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.planos-tab');
    const mensalGrid = document.getElementById('planosMensal');
    const anualGrid = document.getElementById('planosAnual');

    if (!mensalGrid || !anualGrid) {
        console.log('Grids de planos não encontrados');
        return;
    }

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Remove active de todas as tabs
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });

            // Adiciona active na tab clicada
            tab.classList.add('active');

            // Mostra o grid correspondente
            const plano = tab.dataset.plano;
            if (plano === 'mensal') {
                mensalGrid.style.display = 'grid';
                anualGrid.style.display = 'none';
            } else {
                mensalGrid.style.display = 'none';
                anualGrid.style.display = 'grid';
            }
        });
    });

    // Por padrão, mostra o mensal
    mensalGrid.style.display = 'grid';
    anualGrid.style.display = 'none';
});

// ============================================
// GESTÃO DE ENTREGAS - IMAGEM SOBE AO ROLAR
// ============================================
(function() {
    const gestaoImagem = document.getElementById('gestaoEntregasImagem');

    function revelarGestao() {
        if (!gestaoImagem) return;
        const rect = gestaoImagem.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 80) {
            gestaoImagem.classList.add('visible');
        }
    }

    window.addEventListener('scroll', revelarGestao);
    setTimeout(revelarGestao, 500);
    window.addEventListener('resize', revelarGestao);
})();

// ============================================
// ANIMAÇÃO: ELEMENTOS SOBEM AO ROLAR
// ============================================
(function() {
    const elementosParaSubir = document.querySelectorAll(
        '.phone-container, ' +
        '.cardapio-phone-container, ' +
        '.agilize-imagem-wrapper, ' +
        '.sistema-imagem-wrapper, ' +
        '.agilize-chat-wrapper, ' +
        '.gestao-entregas-imagem-wrapper'  // ADICIONADO
    );

    function revelarElementos() {
        elementosParaSubir.forEach(function(el) {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Só ativa se o elemento estiver visível na tela
            if (rect.top < windowHeight - 80 && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revelarElementos);
    setTimeout(revelarElementos, 500);
    window.addEventListener('resize', revelarElementos);
})();

// ============================================
// CARDÁPIO GRÁTIS - SOBE AO ROLAR
// ============================================
(function() {
    const cardapioGratis = document.getElementById('cardapioGratisSection');

    function revelarCardapioGratis() {
        if (!cardapioGratis) return;
        const rect = cardapioGratis.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 80) {
            cardapioGratis.classList.add('visible');
        }
    }

    window.addEventListener('scroll', revelarCardapioGratis);
    setTimeout(revelarCardapioGratis, 500);
    window.addEventListener('resize', revelarCardapioGratis);
})();

// ============================================
// PLANOS - SOBE AO ROLAR
// ============================================
(function() {
    const planosSection = document.getElementById('planosSection');

    function revelarPlanos() {
        if (!planosSection) return;
        const rect = planosSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 80) {
            planosSection.classList.add('visible');
        }
    }

    window.addEventListener('scroll', revelarPlanos);
    setTimeout(revelarPlanos, 500);
    window.addEventListener('resize', revelarPlanos);
})();

// ============================================
// CHATBOT FLUTUANTE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('chatbotToggle');
    const close = document.getElementById('chatbotClose');
    const windowChat = document.getElementById('chatbotWindow');
    const messages = document.getElementById('chatbotMessages');
    const input = document.getElementById('chatbotInput');
    const send = document.getElementById('chatbotSend');
    const options = document.querySelectorAll('.chatbot-option');

    // ============================================
    // ABRIR/FECHAR CHAT
    // ============================================
    function toggleChat() {
        windowChat.classList.toggle('active');
        if (windowChat.classList.contains('active')) {
            // Rola para a última mensagem
            setTimeout(function() {
                messages.scrollTop = messages.scrollHeight;
            }, 100);
        }
    }

    if (toggle) toggle.addEventListener('click', toggleChat);
    if (close) close.addEventListener('click', toggleChat);

    // ============================================
    // RESPOSTAS DO CHATBOT
    // ============================================
    const respostas = {
        'planos': {
            texto: '💎 Temos 3 planos incríveis:<br><br>• <strong>CARDÁPIO WEB</strong> - R$ 29,90/mês<br>• <strong>COMPLETO</strong> - R$ 89,90/mês<br>• <strong>PREMIUM</strong> - R$ 149,90/mês<br><br>📌 Todos com instalação e suporte incluídos!',
            delay: 500
        },
        'demo': {
            texto: '🎥 Claro! Posso te mostrar uma demonstração do sistema.<br><br>Nossos planos incluem:<br>• Cardápio digital interativo<br>• Gestão de pedidos em tempo real<br>• Automação no WhatsApp<br>• KDS para cozinha<br><br>Quer agendar uma demonstração com nosso time?',
            delay: 600
        },
        'duvidas': {
            texto: '❓ Aqui estão as principais dúvidas:<br><br>✅ Sem mensalidade abusiva<br>✅ Sem taxa de comissão por venda<br>✅ Sem fidelidade<br>✅ Suporte 24/7<br><br>Precisa de mais informações? Pergunte à vontade! 😊',
            delay: 500
        },
        'contato': {
            texto: '📞 Quer falar com um atendente humano?<br><br><a href="https://wa.me/5521966729503" target="_blank" rel="noopener" class="chatbot-wa-link"><i class="fab fa-whatsapp"></i> Conversar no WhatsApp</a><br><br>📧 E-mail: contato@cellysistemas.com<br>⏰ Atendimento: 24/7',
            delay: 400
        }
    };

    const respostasPadrao = [
        '🤔 Desculpe, não entendi. Pode reformular sua pergunta?',
        '😊 Posso ajudar com informações sobre planos, demonstração ou dúvidas gerais. Escolha uma opção acima.',
        '📌 Se preferir, clique nos botões de opções rápidas para ser mais ágil!'
    ];

    let ultimaResposta = 0;

    // ============================================
    // ADICIONAR MENSAGEM
    // ============================================
    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chatbot-msg ' + (isUser ? 'chatbot-msg-user' : 'chatbot-msg-bot');
        
        const avatar = document.createElement('div');
        avatar.className = 'chatbot-msg-avatar';
        avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'chatbot-msg-content';
        
        const p = document.createElement('p');
        p.innerHTML = text;
        content.appendChild(p);
        
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(content);
        messages.appendChild(msgDiv);
        
        // Rola para o final
        messages.scrollTop = messages.scrollHeight;
    }

    // ============================================
    // RESPOSTA AUTOMÁTICA (DIGITANDO)
    // ============================================
    function botResponder(texto, delay = 500) {
        // Remove opções temporariamente
        const optionsDiv = document.getElementById('chatbotOptions');
        optionsDiv.style.display = 'none';
        
        // Mostra "digitando..."
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-msg chatbot-msg-bot';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="chatbot-msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="chatbot-msg-content">
                <p class="chatbot-typing">•••</p>
            </div>
        `;
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
        
        // Responde após delay
        setTimeout(function() {
            // Remove o "digitando..."
            const typing = document.getElementById('typingIndicator');
            if (typing) typing.remove();
            
            // Adiciona a resposta
            addMessage(texto, false);
            
            // Mostra opções novamente
            optionsDiv.style.display = 'flex';
        }, delay);
    }

    // ============================================
    // PROCESSAR PERGUNTA
    // ============================================
    function processarPergunta(texto) {
        const pergunta = texto.toLowerCase().trim();
        
        // Verifica se é uma pergunta conhecida
        if (pergunta.includes('plano') || pergunta.includes('preço') || pergunta.includes('mensal') || pergunta.includes('valor') || pergunta.includes('custa')) {
            botResponder(respostas.planos.texto, respostas.planos.delay);
        } else if (pergunta.includes('demo') || pergunta.includes('demonstração') || pergunta.includes('ver') || pergunta.includes('mostrar')) {
            botResponder(respostas.demo.texto, respostas.demo.delay);
        } else if (pergunta.includes('dúvida') || pergunta.includes('pergunta') || pergunta.includes('como') || pergunta.includes('funciona')) {
            botResponder(respostas.duvidas.texto, respostas.duvidas.delay);
        } else if (pergunta.includes('contato') || pergunta.includes('falar') || pergunta.includes('humano') || pergunta.includes('atendente') || pergunta.includes('whatsapp')) {
            botResponder(respostas.contato.texto, respostas.contato.delay);
        } else if (pergunta.includes('oi') || pergunta.includes('olá') || pergunta.includes('ola') || pergunta.includes('bom dia') || pergunta.includes('boa tarde') || pergunta.includes('boa noite')) {
            botResponder('Olá! 👋 Como posso ajudar você hoje? Escolha uma opção acima ou digite sua pergunta.', 400);
        } else {
            // Resposta aleatória padrão
            const index = Math.floor(Math.random() * respostasPadrao.length);
            botResponder(respostasPadrao[index], 500);
        }
    }

    // ============================================
    // EVENTO DOS BOTÕES DE OPÇÃO
    // ============================================
    options.forEach(function(option) {
        option.addEventListener('click', function() {
            const pergunta = this.dataset.pergunta;
            const texto = this.textContent.trim();
            
            // Adiciona mensagem do usuário
            addMessage(texto, true);
            
            // Responde
            if (pergunta === 'planos') {
                botResponder(respostas.planos.texto, respostas.planos.delay);
            } else if (pergunta === 'demo') {
                botResponder(respostas.demo.texto, respostas.demo.delay);
            } else if (pergunta === 'duvidas') {
                botResponder(respostas.duvidas.texto, respostas.duvidas.delay);
            } else if (pergunta === 'contato') {
                botResponder(respostas.contato.texto, respostas.contato.delay);
            }
        });
    });

    // ============================================
    // ENVIAR MENSAGEM DIGITADA
    // ============================================
    function enviarMensagem() {
        const texto = input.value.trim();
        if (texto === '') return;
        
        // Adiciona mensagem do usuário
        addMessage(texto, true);
        input.value = '';
        input.focus();
        
        // Processa a pergunta
        processarPergunta(texto);
    }

    if (send) send.addEventListener('click', enviarMensagem);
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensagem();
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('categoriasTrack');
    if (!track) return;

    if (track.dataset.carrosselIniciado === 'true') return;
    track.dataset.carrosselIniciado = 'true';

    let itens = Array.from(track.children).filter(function (el) {
        return el.classList.contains('categoria-item');
    });

    const vistos = new Set();
    const itensUnicos = [];
    itens.forEach(function (item) {
        const spanEl = item.querySelector('span');
        const texto = spanEl ? spanEl.textContent.trim() : '';
        if (!vistos.has(texto)) {
            vistos.add(texto);
            itensUnicos.push(item);
        }
    });

    track.innerHTML = '';
    itensUnicos.forEach(function (item) {
        track.appendChild(item);
    });

    // 🔥 FORÇA O CÁLCULO DA LARGURA ANTES DE CLONAR
    const totalLargura = track.scrollWidth;

    // Clona os itens originais para o final (para criar o loop infinito)
    itensUnicos.forEach(function (item) {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    // 🔥 O TRUQUE MÁGICO: Define a duração da animação baseada no tamanho total
    // Quanto mais itens, mais lento/mais rápido. Ajuste o fator 20 conforme necessário.
    const duracaoAnimacao = (totalLargura / 150) + 8; // Cálculo dinâmico (teste e ajuste)
    track.style.animationDuration = duracaoAnimacao + 's';

    // Imagens
    const todasImagens = Array.from(track.querySelectorAll('img'));
    todasImagens.forEach(function (img) {
        if (img.decode) {
            img.decode().catch(function () {});
        }
    });

    // Pausa no celular (opcional)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        track.addEventListener('touchstart', function () {
            track.style.animationPlayState = 'paused';
        });
        track.addEventListener('touchend', function () {
            track.style.animationPlayState = 'running';
        });
    }
});

// ============================================
// FORMULÁRIO CARDÁPIO GRÁTIS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const formCardapioGratis = document.getElementById('cardapioGratisForm');
    if (!formCardapioGratis) return;

    formCardapioGratis.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = formCardapioGratis.querySelector('.btn-cardapio-gratis');
        const textoOriginal = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        fetch('https://formsubmit.co/ajax/cellisistemas@gmail.com', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(formCardapioGratis)
        })
            .then(function () {
                btn.textContent = '✅ Recebemos! Vamos te chamar no WhatsApp';
                setTimeout(function () {
                    btn.textContent = textoOriginal;
                    btn.disabled = false;
                    formCardapioGratis.reset();
                }, 3500);
            })
            .catch(function () {
                btn.textContent = 'Erro ao enviar, tente novamente';
                setTimeout(function () {
                    btn.textContent = textoOriginal;
                    btn.disabled = false;
                }, 3500);
            });
    });
});

