// ============================================================
// Celly — LINK NA BIO — IA simples embutida (só regras, sem back-end)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    const botaoIA = document.getElementById('bioBotaoIA');
    const painelIA = document.getElementById('bioPainelIA');
    const mensagens = document.getElementById('bioIaMensagens');
    const opcoesIniciais = document.getElementById('bioIaOpcoesIniciais');
    const formIA = document.getElementById('bioIaForm');
    const inputIA = document.getElementById('bioIaInput');
    const enviarIA = document.getElementById('bioIaEnviar');

    if (!botaoIA || !painelIA) return;

    let saudacaoExibida = false;

    function saudacaoInicial() {
        addMsg('Oi! 👋 Eu sou a assistente virtual da Celly. Me conta, você quer automatizar o atendimento, conhecer o sistema para bares e restaurantes ou prefere falar com um humano?', false);
    }

    botaoIA.addEventListener('click', function () {
        painelIA.classList.toggle('aberto');
        botaoIA.classList.toggle('active');

        if (painelIA.classList.contains('aberto') && !saudacaoExibida) {
            saudacaoExibida = true;
            saudacaoInicial();
        }
    });

    const respostas = {
        automacao: {
            texto: 'Perfeito! A automação com IA da Celly atende seus clientes no WhatsApp 24h por dia, tira dúvidas e recupera vendas sozinha. 🤖',
            extra: 'Funciona pra qualquer tipo de negócio: loja, clínica, delivery, prestador de serviço... e você acompanha tudo em tempo real. 📈',
            cta: { texto: 'Ver a página de Automações', href: 'automacao-chatbot.html' },
            palavras: ['automacao', 'automação', 'whatsapp', 'robo', 'robô', 'chatbot', 'chat bot', 'atendimento automatico', 'ia', '24 horas', '24h', '24hrs', '24 hrs', 'roda sozinho', 'funciona sozinho', 'fica ligado', 'sempre ligado', 'atende sozinho', 'fica rodando', 'fica online']
        },
        sistema: {
            texto: 'Show! Temos um sistema completo para bares e restaurantes: cardápio digital, PDV, KDS na cozinha, controle de entregador, chatbot de atendimento e muito mais, tudo sem mensalidade abusiva. 🍽️',
            extra: 'E funciona pra qualquer tipo de restaurante: bar, lanchonete, pizzaria, hamburgueria, açaiteria... 🍔',
            cta: { texto: 'Conhecer o sistema', href: 'index.html' },
            palavras: ['sistema', 'cardapio', 'cardápio', 'restaurante', 'bar', 'delivery', 'pdv', 'kds', 'entregador', 'comanda', 'lanchonete', 'pizzaria', 'hamburgueria', 'açaiteria', 'trailer', 'food truck', 'cachorro quente', 'hot dog', 'hotdog', 'negocio de comida', 'negócio de comida']
        },
        humano: {
            texto: 'Sem problema! Chame a gente direto no WhatsApp que um humano da equipe te responde rapidinho. 📞',
            extra: 'Atendimento de segunda a sábado, sem robô e sem enrolação. 🙂',
            cta: { texto: 'Chamar no WhatsApp', href: 'https://wa.me/5521966729503?text=Ol%C3%A1!%20Posso%20saber%20mais%20sobre%20a%20Celly%20Sistemas%3F' },
            palavras: ['humano', 'atendente', 'pessoa', 'falar com alguem', 'falar com alguém', 'suporte', 'ajuda', 'telefone', 'numero', 'número', 'contato', 'ligar', 'celular']
        },
        valores: {
            texto: 'Os valores variam de acordo com o plano e o tamanho do seu negócio. Dá uma olhada no meu site que tem todos os detalhes! 💰',
            extra: 'Lá você confere os planos certinho e ainda fala com a gente pelo WhatsApp. 😉',
            cta: { texto: 'Ver valores no site', href: 'index.html' },
            palavras: ['valor', 'valores', 'preco', 'preço', 'precos', 'preços', 'quanto custa', 'quanto e', 'quanto é', 'mensalidade', 'plano', 'planos', 'investimento', 'orcamento', 'orçamento']
        },
        servicos: {
            texto: 'Ótima pergunta! No meu site você vê direitinho como cada serviço funciona, passo a passo, com prints e tudo. 🖥️',
            extra: 'Se ficar com alguma dúvida depois, é só voltar aqui e falar com um humano. 🙂',
            cta: { texto: 'Ver como funciona no site', href: 'index.html' },
            palavras: ['como funciona', 'como funcionam', 'funcionamento', 'servico', 'serviço', 'servicos', 'serviços', 'o que voces fazem', 'o que vocês fazem', 'o que faz']
        },
        sites: {
            texto: 'Com certeza! Também faço site personalizado, com layout do seu jeito, feito sob medida pro seu negócio. 🖥️',
            extra: 'Me chama no WhatsApp e me conta a ideia que eu te passo os detalhes. 😉',
            cta: { texto: 'Chamar no WhatsApp', href: 'https://wa.me/5521966729503?text=Ol%C3%A1!%20Posso%20saber%20mais%20sobre%20a%20Celly%20Sistemas%3F' },
            palavras: ['site', 'sites', 'layout', 'pagina', 'página', 'landing page', 'criar site', 'fazer site', 'site personalizado', 'desenvolver site', 'site pra minha empresa', 'site pro meu negocio']
        }
    };

    const respostaPadrao = {
        texto: 'Quer ser atendido rapidinho? Me manda uma mensagem no WhatsApp ou dá uma olhada no meu site! Ou, se preferir, escolhe uma das opções abaixo. 😊',
        extra: null,
        cta: { texto: 'Chamar no WhatsApp', href: 'https://wa.me/5521966729503?text=Ol%C3%A1!%20Posso%20saber%20mais%20sobre%20a%20Celly%20Sistemas%3F' }
    };

    function detectarChave(texto) {
        // Espaços nas pontas + troca pontuação/hífen por espaço, pra casar só palavra inteira
        // (evita, por ex., "ia" bater dentro de "família", "seria", "dia"...
        // e permite "cachorro-quente" bater com a palavra-chave "cachorro quente")
        const t = ' ' + texto.toLowerCase().replace(/[.,!?;:()-]/g, ' ') + ' ';
        for (const chave in respostas) {
            const encontrada = respostas[chave].palavras.some(function (p) { return t.indexOf(' ' + p + ' ') !== -1; });
            if (encontrada) return chave;
        }
        return null;
    }

    function escapeHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    function addMsg(html, isUser) {
        const div = document.createElement('div');
        div.className = 'bio-ia-msg' + (isUser ? ' bio-ia-msg-user' : '');
        const avatar = isUser
            ? '<i class="fas fa-user"></i>'
            : '<img src="portifolio-img/bio-fotos/robozinho.png" alt="Robô Celly">';
        div.innerHTML =
            '<div class="bio-ia-msg-avatar">' + avatar + '</div>' +
            '<p>' + html + '</p>';
        mensagens.appendChild(div);
        painelIA.scrollTop = painelIA.scrollHeight;
    }

    function mostrarDigitando() {
        const div = document.createElement('div');
        div.className = 'bio-ia-msg bio-ia-msg-digitando';
        div.id = 'bioIaDigitando';
        div.innerHTML =
            '<div class="bio-ia-msg-avatar"><img src="portifolio-img/bio-fotos/robozinho.png" alt="Robô Celly"></div>' +
            '<div class="bio-ia-msg-digitando-dots"><span></span><span></span><span></span></div>';
        mensagens.appendChild(div);
        painelIA.scrollTop = painelIA.scrollHeight;
    }

    function esconderDigitando() {
        const digitando = document.getElementById('bioIaDigitando');
        if (digitando) digitando.remove();
    }

    function mostrarVoltar() {
        const existente = document.getElementById('bioIaVoltar');
        if (existente) existente.closest('.bio-ia-voltar-wrap').remove();

        const div = document.createElement('div');
        div.className = 'bio-ia-voltar-wrap';
        div.innerHTML = '<button type="button" class="bio-ia-voltar" id="bioIaVoltar"><i class="fas fa-arrow-left"></i> Voltar ao menu</button>';
        mensagens.appendChild(div);
        painelIA.scrollTop = painelIA.scrollHeight;

        document.getElementById('bioIaVoltar').addEventListener('click', function () {
            div.remove();
            if (opcoesIniciais) opcoesIniciais.style.display = 'flex';
            painelIA.scrollTop = painelIA.scrollHeight;
        });
    }

    function travarEntrada(travar) {
        document.querySelectorAll('.bio-ia-opcao').forEach(function (b) { b.disabled = travar; });
        if (inputIA) inputIA.disabled = travar;
        if (enviarIA) enviarIA.disabled = travar;
    }

    function mostrarResposta(r) {
        mostrarDigitando();

        setTimeout(function () {
            esconderDigitando();

            const linkCta = r.cta
                ? '<br><br><a class="bio-ia-cta" href="' + r.cta.href + '" target="_blank" rel="noopener">' + r.cta.texto + '</a>'
                : '';
            addMsg(r.texto + linkCta, false);

            if (r.extra) {
                mostrarDigitando();
                setTimeout(function () {
                    esconderDigitando();
                    addMsg(r.extra, false);
                    travarEntrada(false);
                    mostrarVoltar();
                }, 900);
            } else {
                travarEntrada(false);
                if (r === respostaPadrao) {
                    // O texto já pede pra escolher uma opção, então mostra elas na hora
                    if (opcoesIniciais) opcoesIniciais.style.display = 'flex';
                    painelIA.scrollTop = painelIA.scrollHeight;
                } else {
                    mostrarVoltar();
                }
            }
        }, 1400);
    }

    function responder(chave, textoBotaoClicado) {
        addMsg(textoBotaoClicado, true);
        if (opcoesIniciais) opcoesIniciais.style.display = 'none';
        travarEntrada(true);
        mostrarResposta(respostas[chave]);
    }

    document.querySelectorAll('.bio-ia-opcao').forEach(function (btn) {
        btn.addEventListener('click', function () {
            responder(this.dataset.opcao, this.textContent.trim());
        });
    });

    if (formIA && inputIA) {
        formIA.addEventListener('submit', function (e) {
            e.preventDefault();

            const texto = inputIA.value.trim();
            if (!texto) return;

            addMsg(escapeHtml(texto), true);
            inputIA.value = '';
            if (opcoesIniciais) opcoesIniciais.style.display = 'none';
            travarEntrada(true);

            const chave = detectarChave(texto);
            mostrarResposta(chave ? respostas[chave] : respostaPadrao);
        });
    }
});
