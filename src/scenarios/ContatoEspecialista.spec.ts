import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test.describe('Avaliação - Preenchimento de Formulário de Inscrição com IA', () => {
  test('Preencher informações para contato com especialista', async ({ page }) => {
    await page.goto('https://bruningsistemas.com.br');

    const aiArgs = { page, test };

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        ai('Click on the "EXPERIMENTE" button in the header', aiArgs)
      ]);

    await page.waitForTimeout(1000);
    await ai('Fill out the contact form with valid information; one of the fields has a label that is a math calculation, type the result there', aiArgs);
    await ai('In the "Qual seu segmento?" field, select the option "Varejo"', aiArgs);
    await ai('In the "Quantidade de usuários" field, select the option "1 a 2"', aiArgs);
    await ai('Submit the contact form through the button "Quero conhecer melhor!"', aiArgs);
    await ai('Validate that the following message appears: "Obrigado! Em breve um dos nossos especialistas entrará em contato com você!"', aiArgs);
  });
});
