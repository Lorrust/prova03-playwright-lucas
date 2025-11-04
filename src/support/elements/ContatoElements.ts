import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class ContatoElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoNome(): Locator {
    return this.page.locator('input[id="rd-text_field-llmi8bqc"]');
  }

  getCampoEmail(): Locator {
    return this.page.locator('input[id="rd-email_field-llmi8bqd"]');
  }

  getLabelErroEmail(): Locator {
    return this.page.locator('label.error', { hasText: 'Endereço de e-mail inválido' });
  }

  getCampoEmpresa(): Locator {
    return this.page.locator('input[id="rd-text_field-llmi8bqe"]');
  }

  getCampoCelular(): Locator {
    return this.page.locator('input[id="rd-phone_field-llmi8bqf"]');
  }

  getBotaoEnviar(): Locator {
    return this.page.locator('button[id="rd-button-ll5lc3p4"]');
  }
}
