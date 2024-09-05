import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class HeadersDto {
  @IsString()
  @IsNotEmpty()
  public 'x-store-id': string;

  @IsString()
  @IsNotEmpty()
  public 'x-version': string;

  @IsOptional()
  public 'x-correlation-id'?: string;

  @IsOptional()
  public 'x-utm-source'?: string;

  @IsOptional()
  public 'x-utm-campaign'?: string;

  @IsOptional()
  public 'x-utm-medium'?: string;

  @IsOptional()
  public 'x-utm-content'?: string;

  @IsOptional()
  public 'x-utm-term'?: string;

  @IsOptional()
  public 'x-customer-id'?: string;

  constructor(partial: Partial<HeadersDto>) {
    Object.assign(this, partial);
  }
}
