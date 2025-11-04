import { expect, test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import ContatoPage from '../support/pages/ContatoPage';

test.describe('Avaliação - Preenchimento de formulário para contato com consultor', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let contatoPage: ContatoPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.gestao')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    contatoPage = new ContatoPage(page);
    await page.goto(BASE_URL);
  });

  test('Preencher formulário de contato com consultor', async ({ page }) => {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(200);

    await contatoPage.preencherFormulario();
    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      contatoPage.enviarFormulario()
    ]);

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain(
      'Obrigado! Em breve, um de nossos consultores entrarão em contato!'
    );

    await dialog.accept();
  });

  test('Preencher formulário de contato com dados inválidos', async ({ page }) => {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(200);

    await contatoPage.preencherFormularioInvalido();
    await contatoPage.enviarFormulario();
    await contatoPage.verificarMensagemErroEmail();
  });
});
