(function () {
    'use strict';

    var WHATSAPP_NUMERO = '5521966729503';

    var PLANOS = {
        'cardapio-web': {
            nome: 'Cardápio Web',
            badge: 'PARA COMEÇAR',
            desc: 'Perfeito para começar sua jornada digital com um cardápio profissional online.',
            precoMensal: 29.90,
            precoAnualMensal: 25.42,
            precoAnualTotal: 305.04,
            instalacao: 49.90,
            beneficios: [
                'Cardápio digital completo e profissional',
                'Link WhatsApp integrado',
                'Finalização de pedidos via WhatsApp',
                'Design responsivo (funciona em celular)',
                'Domínio personalizado',
                'Fotos de produtos',
                'Descrições e preços',
                'Atualização do cardápio em tempo real'
            ]
        },
        completo: {
            nome: 'Completo',
            badge: 'MAIS ESCOLHIDO',
            desc: 'O sistema completo para gerenciar seu negócio de delivery com automação profissional.',
            precoMensal: 89.90,
            precoAnualMensal: 76.42,
            precoAnualTotal: 917.04,
            instalacao: 150.00,
            beneficios: [
                'Tudo do Cardápio Web',
                'KDS (Sistema de Cozinha Digital)',
                'Gestão de entregas e entregadores',
                'Painel administrativo completo',
                'Dashboard de vendas em tempo real',
                'Relatórios detalhados de faturamento',
                'Gestão de estoque',
                'CRM de clientes',
                'App garçom (Comando Digital)',
                'Impressora integrada',
                'Até 5 entregadores',
                'Notificações automáticas',
                'Suporte por e-mail'
            ]
        },
        premium: {
            nome: 'Premium',
            badge: 'MAIS COMPLETO',
            desc: 'Solução completa com integrações avançadas para expandir suas vendas em múltiplos canais.',
            precoMensal: 149.90,
            precoAnualMensal: 127.42,
            precoAnualTotal: 1529.04,
            instalacao: 300.00,
            beneficios: [
                'Tudo do Completo',
                'Integração iFood',
                'Integração Uber Eats',
                'Rota inteligente para entregas',
                'Rastreamento GPS',
                'Até 10+ entregadores',
                'Dashboard analytics avançado',
                'Relatórios exportáveis (Excel/PDF)',
                'NFC/QR Code integrado',
                'Pixel de conversão (Facebook/Google)',
                'Suporte prioritário',
                'Consultoria 1-a-1'
            ]
        }
    };

    function formatarReal(valor) {
        return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function getPlanoDaUrl() {
        var params = new URLSearchParams(window.location.search);
        var slug = (params.get('plano') || '').toLowerCase();
        return PLANOS[slug] ? slug : 'completo';
    }

    document.addEventListener('DOMContentLoaded', function () {
        var slugAtual = getPlanoDaUrl();
        var plano = PLANOS[slugAtual];
        var ciclo = 'mensal';

        var elBadge = document.getElementById('cartBadge');
        var elNome = document.getElementById('cartNome');
        var elDesc = document.getElementById('cartDesc');
        var elPreco = document.getElementById('cartPreco');
        var elPrecoSufixo = document.getElementById('cartPrecoSufixo');
        var elInstalacao = document.getElementById('cartInstalacao');
        var elBeneficios = document.getElementById('cartBeneficios');
        var ciclobtns = document.querySelectorAll('.cart-ciclo-btn');

        var resumoNome = document.getElementById('resumoNome');
        var resumoCiclo = document.getElementById('resumoCiclo');
        var resumoPreco = document.getElementById('resumoPreco');
        var resumoInstalacao = document.getElementById('resumoInstalacao');
        var resumoEconomiaLinha = document.getElementById('resumoEconomiaLinha');
        var resumoEconomia = document.getElementById('resumoEconomia');
        var resumoTotal = document.getElementById('resumoTotal');
        var continuarBtn = document.getElementById('cartContinuar');

        function precoCiclo() {
            return ciclo === 'mensal' ? plano.precoMensal : plano.precoAnualMensal;
        }

        function render() {
            elBadge.textContent = plano.badge;
            elNome.textContent = plano.nome;
            elDesc.textContent = plano.desc;
            elInstalacao.textContent = formatarReal(plano.instalacao);
            elBeneficios.innerHTML = plano.beneficios.map(function (b) {
                return '<li>' + b + '</li>';
            }).join('');

            var precoPlano = precoCiclo();
            var sufixo = ciclo === 'mensal' ? '/mês' : '/mês no anual';

            elPreco.textContent = precoPlano.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            elPrecoSufixo.textContent = sufixo;

            resumoNome.textContent = plano.nome;
            resumoCiclo.textContent = ciclo === 'mensal' ? 'Pago mensalmente' : 'Pago anualmente (R$ ' + plano.precoAnualTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/ano)';
            resumoPreco.textContent = formatarReal(ciclo === 'mensal' ? plano.precoMensal : plano.precoAnualTotal);
            resumoInstalacao.textContent = formatarReal(plano.instalacao);

            if (ciclo === 'anual') {
                var economia = (plano.precoMensal * 12) - plano.precoAnualTotal;
                resumoEconomia.textContent = formatarReal(economia) + '/ano';
                resumoEconomiaLinha.hidden = false;
            } else {
                resumoEconomiaLinha.hidden = true;
            }

            var total = (ciclo === 'mensal' ? plano.precoMensal : plano.precoAnualTotal) + plano.instalacao;
            resumoTotal.textContent = formatarReal(total);
        }

        ciclobtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                ciclobtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                ciclo = btn.dataset.ciclo;
                render();
            });
        });

        continuarBtn.addEventListener('click', function () {
            var precoPlano = ciclo === 'mensal' ? plano.precoMensal : plano.precoAnualTotal;
            var precoTxt = formatarReal(precoPlano) + (ciclo === 'mensal' ? '/mês' : '/ano');
            var msg = 'Olá! Quero contratar o plano ' + plano.nome +
                ' (' + precoTxt + ') + instalação de ' + formatarReal(plano.instalacao) + ' (única vez).';
            var url = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(msg);
            window.open(url, '_blank', 'noopener');
        });

        render();
    });
})();
