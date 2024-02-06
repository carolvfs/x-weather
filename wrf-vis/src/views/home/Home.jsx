import React from 'react'
import './Home.css'
import Main from '../../components/layout/Main'
import Aux from '../../components/layout/AuxDiv'
// import fig1 from '../../assets/imgs/combinacoes.png'
import fig1 from '../../assets/imgs/parametrizations.png'
import fig2 from '../../assets/imgs/media.png'
import fig3 from '../../assets/imgs/prob.png'

export default props =>
    <React.Fragment>
        <Aux></Aux>
        <Aux></Aux>
        <Aux></Aux>
        <Aux></Aux>
        <Main icon='home' title='WRF-Vis'
            subtitle='Sistema de visualização de dados'>
            <div className='p-3 mt-3' id='home'>
                <h2>Sistema para a investigação das tendências de parametrizações de processos físicos na produção de chuva</h2>
                <hr />
                <h4 className='mb-3 mt-3'>1. Introdução</h4>
                <p className='mb-2 ml-4'>
                Na modelagem numérica do tempo, há processos físicos que não são resolvidos explicitamente pelos modelos, 
                então, esquemas de parametrização são utilizados para representá-los. 
                Existe uma série de possíveis parametrizações para cada processo físico, entretanto, na configuração de uma simulação, 
                é preciso selecionar uma delas, ou seja, uma para cada processo. 
                Essa decisão depende do evento a ser estudado e do conhecimento da influência dos esquemas de parametrização nos resultados da simulação em determinado local. 
                Esse conhecimento pode ser obtido gerando um conjunto de simulações para a área e a data de interesse, cada uma utilizando uma parametrização distinta para cada processo físico e, ao final, a comparação dos resultados. 
                Como não existe esse tipo de estudo para a Região Serrana do Estado do Rio de Janeiro (RSRJ), que é um lugar com histórico de desastres ambientais oriundos de eventos severos de chuva, esse experimento foi realizado para essa localidade. 
                Esse sistema de visualização, por sua vez, foi desenvolvido para auxiliar os especialistas em modelagem numérica do tempo a investigarem os resultados desse experimento em busca da influência das principais amostras de parametrizações de processos físicos na modelagem da chuva na RSRJ.
                </p>
                <h4 className='mb-3 mt-3'>2. Características do Conjunto de Simulações</h4>
                <p className='mb-2 ml-4'>
                O experimento foi realizado com o modelo WRF, versão 4.2.1, no período de 11/01/2011 00:00Z à 12/01/2011 06:00Z 
                (horizonte temporal de trinta horas). Primeiramente, foram selecionados os processos físicos que sofreriam modificações 
                na sua representação: microfísica de nuvens, cumulus, camada de superfície, superfície terrestre e camada limite planetária. 
                Para cada um, foi selecionada uma amostra de parametrizações mais utilizadas no meio científico, apresentadas na Tabela 1. 
                Cada simulação foi configurada considerando uma parametrização para cada processo físico, como exemplificado na Tabela 2.

                </p>
                <p className='mb-2 mt-3 ml-4 text-center'>
                    <i>Tabela 1. Processos Físicos e amostras de parametrizações</i>
                </p>
                <table align='center' border="1">
                    <tbody>
                        <tr>
                            <td className='text-center'><b>Processos Físicos</b></td>
                            <td className='text-center'><b>Amostras de Parametrizações</b></td>
                        </tr>
                        <tr>
                            <td className='p-1'>Cumulus</td>
                            <td className='p-1'>Kain-Fritsch (1), Betts-Miller-Janijc (BMJ) (2), Grell-Freitas (3), Grell-3D (5), Grell-Devenyi (93)</td>
                        </tr>
                        <tr>
                            <td className='p-1'>Microfísica de Nuvens</td>
                            <td className='p-1'>Kessler (1), Eta (Ferrier) (5), WSM6 (6()), Goddard (7)</td>
                        </tr>
                        <tr>
                            <td className='p-1'>Superfície Terrestre</td>
                            <td className='p-1'>Dudhia (1), Noah MP (4)</td>
                        </tr>
                        <tr>
                            <td className='p-1'>Camada de Superfície</td>
                            <td className='p-1'>MM5 (1), MM5 Old (91)</td>
                        </tr>
                        <tr>
                            <td className='p-1'>Camada Limite Planetária</td>
                            <td className='p-1'>MYNN3 (6), MRF (99)</td>
                        </tr>
                    </tbody>

                    </table>
                <p className='mb-2 mt-4 ml-4 text-center'>
                    <i>Tabela 2. Exemplo de configuração de parametrizações dos processos físicos de duas simulações hipotéticas</i>
                </p>
                    <table align='center' border="1">
                    <tbody>
                        <tr>
                            <td className='p-1'></td>
                            <td className='p-1 text-center'><b>Cumulus</b></td>
                            <td className='p-1 text-center'><b>Microfísica de Nuvens</b></td>
                            <td className='p-1 text-center'><b>Superfície Terrestre</b></td>
                            <td className='p-1 text-center'><b>Camada de Superfície</b></td>
                            <td className='p-1 text-center'><b>Camada Limite Planetária</b></td>
                        </tr>
                        <tr>
                            <td className='p-1 text-center'><b>Simulação 1</b></td>
                            <td className='p-1 text-center'>Kain-Fritsch</td>
                            <td className='p-1 text-center'>Kessler</td>
                            <td className='p-1 text-center'>Dudhia</td>
                            <td className='p-1 text-center'>MM5</td>
                            <td className='p-1 text-center'>MYNN3</td>
                        </tr>
                        <tr>
                            <td className='p-1 text-center'><b>Simulação 2</b></td>
                            <td className='p-1 text-center'>BMJ</td>
                            <td className='p-1 text-center'>Eta (Ferrier)</td>
                            <td className='p-1 text-center'>Noah MP</td>
                            <td className='p-1 text-center'>MM5</td>
                            <td className='p-1 text-center'>MYNN3</td>
                        </tr>
                    </tbody>
                    </table>
                <p className='mb-2 mt-4 ml-4'>
                Foram consideradas todas as possibilidades de combinação dessas amostras, então, o total de simulações é exatamente 
                a quantidade de combinações possíveis, resultante da multiplicação do tamanho das amostras, ou seja, 5 x 4 x 2 x 2 x 2, 
                conforme explicitado na Figura 1. Sendo assim, o conjunto (ensemble) é formado por cento e sessenta simulações (membros). 
                </p>
                <p className='mb-2 ml-4' align='center'>
                    <img src={fig1} alt="some text" width='50%' height='50%'/>
                </p>
                <p className='mb-2 ml-4' align='center'>
                <i>Figura 1: Cálculo do total de possibilidades de combinações de parametrizações de processos físicos.</i>
                </p>

                <h4 className='mb-3 mt-3'>3. Utilizando o Sistema</h4>
                <p className='mb-2 ml-4'>
                Esse sistema é composto por dois módulos: Média e Probabilidade. Para acessar o primeiro módulo, o usuário deve clicar com 
                o botão esquerdo do mouse no ícone “Média”, localizado do lado esquerdo da barra de navegação, na parte superior da tela. 
                Para acessar o segundo módulo, o usuário realiza o mesmo procedimento, mas considerando o ícone “Probabilidade”. 
                A seguir, o funcionamento de cada módulo é descrito detalhadamente.
                </p>
                <p className='mb-2 ml-4'>
                <b>Observação</b>: Em ambos os módulos, as análises ocorrerão por amostra de parametrizações, ou seja, o usuário escolherá 
                um processo físico - microfísica de nuvens, cumulus, camada de superfície, superfície terrestre e camada limite planetária 
                - e o sistema selecionará a amostra de parametrizações relacionadas a ele.  A título de exemplo, se for escolhido o processo 
                físico “Microfísica de Nuvens”, o sistema selecionará a amostra das parametrizações Kessler, Eta (Ferrier), WSM6 e Goddard. 
                Em seguida, o sistema organizará o ensemble em subconjuntos, um para cada parametrização da amostra. Na hipótese de o usuário 
                selecionar “Microfísica de Nuvens”, o sistema criará quatro subconjuntos, um identificado como Kessler, outro como 
                Eta (Ferrier), outro como WSM6, e mais um como Goddard. Os membros pertencerão ao subconjunto da parametrização que utilizaram 
                em suas configurações. Nesse exemplo, cada subconjunto terá quarenta membros, pois o ensemble possui cento e sessenta membros 
                e a amostra possui quatro parametrizações, logo, 160 / 4 = 40. Dessa forma, as análises serão realizadas a partir dos 
                subconjuntos criados pelo sistema.
                </p>

                <h5 className='mb-3 mt-3 ml-4'>3.1 Módulo Média</h5>
                
                    <p className='mb-2 ml-4'>3.1.1. Na barra de navegação, do lado direito da tela, o usuário encontrará um botão do tipo “dropdown” para selecionar o processo físico que deseja investigar. Por padrão, o sistema começa com o processo físico “Cumulus” selecionado; </p>
                    <p className='mb-2 ml-4'>3.1.2. Escolhido o processo físico, o sistema selecionará a amostra de parametrizações relacionadas a ele, criará os subconjuntos de membros e montará a interface.</p>
                    <p className='mb-2 ml-4'>3.1.3.	Nessa interface, a tela é dividida em três quadros que interagem entre si: Quadro A (Matrizes de Médias de Chuva no Espaço por Membro), Quadro B (Quadro de Mapas) e Quadro C (Médias de Chuva por Parametrização), conforme Figura 2.</p>

                    <p className='mb-2 ml-4' align='center'>
                    <img src={fig2} alt="some text" width='50%' height='50%'/>
                    </p>
                    <p className='mb-2 ml-4' align='center'>
                    <i>Figura 2: Exemplo da tela do sistema criado para o módulo “Média” na análise do processo “MIcrofísica de Nuvens”. Quadro A (lado direito superior): Matrizes de Médias de Chuva no Espaço por Membro; Quadro B (lado esquerdo): Mapas; Quadro C: Médias de Chuva por Parametrização.</i>
                    </p>
                <p className='mb-2 ml-4'>3.1.4. <u>Quadro A</u>: apresenta uma matriz para cada subconjunto de membros, ou seja, se o processo físico escolhido for “Microfísica de Nuvens”, aparecerão quatro matrizes. Cada matriz é assim caracterizada:</p>
                <ul className='mb-2 ml-4'>
                    <li>cada coluna da matriz representa um membro, ou seja, na hipótese de o processo físico escolhido ter sido “Microfísica de Nuvens”, cada matriz apresentará quarenta colunas;</li>
                    <li>cada linha da matriz representa um instante de tempo e estão organizadas em ordem crescente de baixo para cima, ou seja, a linha da base representa o tempo “0h” e a linha do topo o tempo “30h”;</li>
                    <li>a cor de cada célula representa o volume de chuva médio que aquele membro simulou naquele instante de tempo. 
                        O usuário tem a opção de visualizar esses valores em escala local selecionando o botão “Escala Local” ou 
                        “Escala Local (todos)” no canto superior esquerdo do Quadro A (quadro de matrizes), sendo o segundo botão útil para 
                        alterar a escala dos três quadros simultaneamente. Observação: De início, esses valores são referentes a toda a região 
                        para a qual as simulações foram realizadas, entretanto, o usuário poderá explorar áreas específicas pertencentes a ela 
                        selecionando-as em um dos mapas do Quadro B.</li>
                </ul>
                <p className='mb-2 mt-3 ml-4'>
                Após a exploração das matrizes, o usuário deverá escolher um instante de tempo e dois subconjuntos por vez para realizar 
                investigações destes na dimensão espacial.  Para isso, foi incluída no lado direito do Quadro A uma coluna de ícones 
                identificados que representam os instantes de tempo e estão alinhados com as linhas das matrizes. Clicando em um dos ícones, 
                o usuário seleciona um tempo. Além disso, abaixo de cada matriz encontram-se dois botões: “Mapa 1” e “Mapa 2”. 
                O usuário deverá selecionar o “Mapa 1” de um subconjunto e o “Mapa 2” de outro subconjunto. Feito isso, o Quadro B é atualizado 
                e o usuário volta sua atenção para ele. O usuário poderá repetir esse passo a qualquer momento para atualizar o Quadro B. 
                O instante de tempo selecionado nesse Quadro também atualiza os valores de uma tabela que se encontra no Quadro C.
                </p>
                <p className='mb-2 mt-3 ml-4'>
                3.1.5.	<u>Quadro B</u>: No Mapa 1 aparecem os valores médios de chuva previstos pelos membros pertencentes ao subconjunto selecionado 
                com o botão “Mapa 1” no Quadro A, no instante de tempo escolhido. Ou seja, para esse instante de tempo, foi realizada uma média 
                dos valores de chuva simulados pelos membros daquele subconjunto para cada ponto de grade. O mesmo ocorre para o “Mapa 2”, sendo 
                o subconjunto referente ao que foi selecionado pelo botão “Mapa 2” do Quadro A. O “Mapa 3” apresenta a diferença entre os valores 
                do “Mapa 1” e do “Mapa 2”, nessa ordem. Em qualquer um dos três mapas, é possível selecionar uma região específica e os valores do 
                Quadro A e do Quadro C são atualizados considerando apenas a área selecionada. Para verificar outros subconjuntos ou outro instante 
                de tempo, o usuário deve retornar ao Quadro A e atualizar suas escolhas. O usuário tem a opção de visualizar os valores dos Mapas 1 
                e 2 em escala local selecionando o botão “Escala Local” na parte superior esquerda do Quadro B.
                </p>
                <p className='mb-2 mt-3 ml-4'>
                3.1.6. <u>Quadro C</u>: Nesse quadro, são apresentados dois tipos de gráfico na mesma região e uma tabela. Na região do gráfico, 
                há uma linha vertical que aponta o instante de tempo selecionado. O primeiro tipo é o gráfico de linhas, sendo uma linha de 
                cor preta representante de todo o ensemble, ou seja, do conjunto inteiro, e as outras linhas (de outras cores) representantes 
                dos subconjuntos da amostra de parametrizações. Por exemplo, se o processo físico escolhido for “Microfísica de Nuvens”, 
                surgirá uma linha preta e outras quatro linhas de cores distintas. A linha preta representa o volume médio de chuva (eixo y) 
                simulado por todos os membros do ensemble na região de interesse (que é a área inteira ou a área selecionada no Quadro B) ao 
                longo do tempo (eixo x). As outras quatro linhas do exemplo representam as mesmas variáveis, mas consideram apenas os membros 
                pertencentes aos respectivos subconjuntos.
                </p>
                <p className='mb-2 ml-4'>
                O segundo tipo de gráfico é o de área. Por padrão, esses gráficos encontram-se invisíveis de início, mas o usuário poderá 
                acionar os ícones da tabela do lado direto do Quadro C, na coluna intitulada “DP” para visualizá-los. As cores são as mesmas 
                usadas no gráfico de linhas, pois representam os mesmos subconjuntos e o mesmo ensemble. O limite superior de cada área 
                representa os valores da média da chuva simulada ao longo do tempo somada a duas vezes o seu desvio-padrão (M + 2DP), 
                enquanto o limite inferior representa os valores da média da chuva simulada ao longo do tempo subtraída de duas vezes o seu 
                desvio-padrão (M - 2DP).
                </p>
                <p className='mb-2 ml-4'>
                A tabela (lado direito do Quadro C) apresenta (1) a legenda das cores, cujos ícones também são botões para o usuário filtrar 
                as linhas e as áreas visíveis, (2) os valores explícitos do gráfico no instante de tempo selecionado no Quadro A, (3) a 
                identificação do grupo que está representado no Quadro B.
                </p>
                <p className='mb-2 ml-4'>
                O usuário tem a opção de visualizar os valores dos eixos do gráfico em escala local selecionando o botão “Escala Local” na parte superior esquerda do Quadro C.
                </p>

                <h5 className='mb-3 mt-3 ml-4'>3.2 Módulo Probabilidade</h5>

                <p className='mb-2 ml-4'>
                'De modo análogo ao módulo “Média”, a Figura 3 ilustra um panorama da tela apresentada ao usuário quando o módulo “Probabilidade” 
                é selecionado. Esse módulo possui uma estrutura semelhante à do módulo “Média”: há um botão na barra de navegação para seleção do 
                processo físico que, por padrão, também começa com “Microfísica de Nuvens” e apresenta três quadros de análise. O que muda nessa 
                interface são os dados apresentados, a estrutura do quadro C e um novo botão na barra de navegação. Com este botão, o usuário 
                seleciona limites inferiores de volumes de chuva para investigar, entre as opções: {'>='}5mm, {'>='}10mm, {'>='}20mm, {'>='}30mm. Por padrão, 
                o sistema começa com o limite inferior “{'>='} 5mm” selecionado. Da mesma forma que em “Média”, o sistema selecionará a amostra de 
                parametrizações relacionadas ao processo eleito, criará os subconjuntos de membros e montará a interface, mas, dessa vez, os dados 
                apresentados estarão de acordo com o limite inferior selecionado. O Quadro A apresenta matrizes de probabilidades no espaço por membro, 
                o Quadro B expõe mapas e o Quadro C, as Funções Massa de Probabilidade.
                </p>

                <p className='mb-2 ml-4' align='center'>
                    <img src={fig3} alt="some text" width='50%' height='50%'/>
                </p>
                <p className='mb-2 ml-4' align='center'>
                <i>Figura 3: Exemplo da tela do sistema criado para o módulo “Probabilidade” na análise do processo “MIcrofísica de Nuvens”. Quadro A (lado direito superior):Matrizes de Probabilidades no Espaço por Membro; Quadro B (lado esquerdo): Mapas; Quadro C: Funções Massa de Probabilidade.</i>
                </p>
                <p className='mb-2 ml-4'>3.2.1. <u>Quadro A</u>: a estrutura e as interações das matrizes com o Quadro B seguem as descrições 
                realizadas para o Quadro A do módulo “Média”, substituindo apenas o significado das suas cores. A cor de cada célula representa 
                o percentual do espaço, ou seja, da área de interesse em que aquele membro simulou volumes de chuva maiores ou iguais ao limite 
                inferior selecionado na barra de navegação naquele instante de tempo. Novamente, o usuário deverá escolher um instante de tempo 
                e dois subconjuntos por vez para realizar investigações na dimensão espacial. O instante de tempo neste módulo também atualiza 
                o Quadro B e o Quadro C.
                </p>
                <p className='mb-2 ml-4'> 3.2.2. <u>Quadro B</u>: este quadro funciona da mesma maneira como a descrita no Quadro B do módulo 
                “Média”, sendo as cores dos dois primeiros mapas referentes ao percentual de membros pertencentes aos subconjuntos eleitos no 
                Quadro A que geraram volumes maiores ou iguais ao limite inferior selecionado na barra de navegação no instante de tempo 
                escolhido. O “Mapa 3” continua representando a diferença entre os valores do “Mapa 1” e do “Mapa 2”, <b>nessa ordem</b>. 
                </p>
                <p className='mb-2 ml-4'> 3.2.3. <u>Quadro C</u>: Nesse quadro, são disponibilizados três grupos de visualização, sendo o 
                primeiro (da esquerda para a direita) referente a um instante de tempo anterior ao selecionado no Quadro A, o segundo ao 
                próprio instante de tempo selecionado e o terceiro ao instante seguinte. Em cada visualização, há dois gráficos de barras, 
                um com eixo x crescente para o lado direito e outro com o mesmo eixo crescente para o lado esquerdo. Esses gráficos são 
                referentes aos subconjuntos selecionados no Quadro A e descrevem suas Funções Massa de Probabilidade. Por exemplo, se “BMJ” 
                foi selecionada no “Mapa 1” e “Grell-Freitas” no “Mapa 2” do Quadro A, a Função Massa de Probabilidade de “BMJ” estará do lado 
                esquerdo e a de “Grell-Freitas” do lado direito. Cada barra tem sua base no eixo y e se encontra entre dois números, que 
                indicam os limites inferior e superior de um intervalo de volume de chuva. Os valores do eixo x indicam o percentual de membros 
                do subconjunto que geraram valores pertencentes aos intervalos do eixo y para a área de interesse (que pode ser atualizada no 
                Quadro B (quadro de mapas).
                </p>          
            </div>
        </Main>
            
    </React.Fragment>

    