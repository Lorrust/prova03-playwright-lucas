import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BasePage from './BasePage';
import ContatoElements from '../elements/ContatoElements';

export default class ContatoPage extends BasePage {
  readonly contatoElements: ContatoElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.contatoElements = new ContatoElements(page);
  }

  async preencherFormulario(): Promise<void> {
    await this.contatoElements.getCampoNome().fill(faker.person.firstName());
    await this.contatoElements.getCampoEmail().fill(faker.internet.email());
    await this.contatoElements.getCampoEmpresa().fill(faker.person.jobArea());
    await this.contatoElements.getCampoCelular().fill(faker.phone.number({ style: 'national' }));
  }

  async preencherFormularioInvalido(): Promise<void> {
    await this.contatoElements.getCampoNome().fill(faker.person.firstName());
    await this.contatoElements.getCampoEmail().fill(faker.person.lastName());
    await this.contatoElements.getCampoEmpresa().fill(faker.person.jobArea());
    await this.contatoElements.getCampoCelular().fill(faker.person.jobTitle());
  }

  async enviarFormulario(): Promise<void> {
    await this.contatoElements.getBotaoEnviar().click();
  }

  async verificarMensagemErroEmail(): Promise<void> {
    await expect(this.contatoElements.getLabelErroEmail()).toBeVisible();
  }
}
