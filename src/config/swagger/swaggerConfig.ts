import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const APP_NAME = process.env.API_NAME;
const APP_VERSION = process.env.API_VERSION;
const APP_URL = process.env.API_URL;

// $ api-spec-converter --from=openapi_3 --to=swagger_2 --syntax=yaml --order=alpha http://localhost:3000/swagger/json > swagger.json
export const swaggerConfig = async function conf(
  app: INestApplication,
  modules: any[],
): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .setContact('', '', '')
    .addServer(APP_URL)
    .addBearerAuth()
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'headers' },
      'x-api-key',
    )
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: modules,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('', app, document);
};
