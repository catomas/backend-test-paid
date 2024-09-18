import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import {
  CreditCardInfo,
  CustomerData,
} from "./interfaces/interface-transaction-use-case";
import { v4 as uuidv4 } from "uuid";
import * as crypto from "crypto";

@Injectable()
export class WompiService {
  private readonly baseUrl = process.env.WOMPI_BASE_URL;

  constructor(private readonly httpService: HttpService) {}

  async getAcceptanceToken(): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/merchants/${process.env.WOMPI_PUBLIC_KEY}`
        )
      );

      return response.data.data.presigned_acceptance.acceptance_token;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error getting acceptance token",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createTokenCreditCard(creditCardData: CreditCardInfo): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${process.env.WOMPI_PUBLIC_KEY}`,
        "Content-Type": "application/json",
      };

      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/tokens/cards`, creditCardData, {
          headers,
        })
      );

      return response.data.data.id;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response.data,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createTransaction(
    acceptance_token: string,
    totalPrice: number,
    creditCardTokenId: string,
    customerData: CustomerData
  ): Promise<string> {
    const amount_in_cents = totalPrice * 100;

    try {
      if (!acceptance_token) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "Acceptance token is required",
          },
          HttpStatus.BAD_REQUEST
        );
      }

      if (!amount_in_cents) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "Amount in cents is required",
          },
          HttpStatus.BAD_REQUEST
        );
      }

      if (!creditCardTokenId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "Credit card token is required",
          },
          HttpStatus.BAD_REQUEST
        );
      }

      if (!customerData) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "Customer data is required",
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const {
        phone_number,
        full_name,
        legal_id,
        legal_id_type,
        customer_email,
        address_line_1,
        region,
        city,
        postal_code,
      } = customerData;

      const headers = {
        Authorization: `Bearer ${process.env.WOMPI_PUBLIC_KEY}`,
        "Content-Type": "application/json",
      };

      const currency = "COP";

      const reference = uuidv4();

      const signature = `${reference}${amount_in_cents}${currency}${process.env.WOMPI_SECRET_INTEGRITY}`;

      const hashSignature = crypto
        .createHash("sha256")
        .update(signature)
        .digest("hex");

      const body = {
        acceptance_token,
        reference,
        amount_in_cents,
        currency,
        signature: hashSignature,
        payment_method: {
          type: "CARD",
          installments: 2,
          token: creditCardTokenId,
        },
        customer_data: {
          phone_number,
          full_name,
          legal_id,
          legal_id_type,
        },
        customer_email,
        shipping_address: {
          address_line_1,
          country: "CO",
          region,
          city,
          name: full_name,
          phone_number,
          postal_code,
        },
      };

      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/transactions`, body, {
          headers,
        })
      );

      console.log(response.data.data);

      return response.data.data.id;
    } catch (error) {
      if (error.response.data) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.response.data,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error creating transaction",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getTransactionStatus(transactionId: string): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${process.env.WOMPI_PUBLIC_KEY}`,
        "Content-Type": "application/json",
      };

      const maxRetries = 5; // Maximum number of retries
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const response = await firstValueFrom(
            this.httpService.get(
              `${this.baseUrl}/transactions/${transactionId}`,
              {
                headers,
              }
            )
          );

          if (response.data.data.status !== "PENDING") {
            return response.data.data.status;
          }

          // Wait for a specified time before retrying
          await delay(5000); // 5 seconds delay
        } catch (error) {
          console.error(
            "Error checking transaction status:",
            error.response?.data || error.message
          );
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error:
                error.response?.data || "Error checking transaction status",
            },
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Transaction status not updated",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } catch (error) {
      if (error.response.data) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.response.data,
          },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error getting transaction",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
