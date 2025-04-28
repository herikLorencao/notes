import { Injectable } from '@nestjs/common';
import { Ingest, Search } from 'sonic-channel';
import * as process from 'node:process';

@Injectable()
export class SonicGateway {
  private readonly SONIC_DEFAULT_OPTIONS = {
    lang: 'por',
  };

  async search(query: string, collection: string, bucket: string) {
    const channel = this.getSearchChannel();
    let result: string[] = [];

    try {
      result = await channel.query(
        collection,
        bucket,
        query,
        this.SONIC_DEFAULT_OPTIONS,
      );
    } catch (e) {
      console.error(e);
    } finally {
      await channel.close();
    }

    return result;
  }

  async suggest(query: string, collection: string, bucket: string) {
    const channel = this.getSearchChannel();
    let result: string[] = [];

    try {
      result = await channel.suggest(collection, bucket, query);
    } catch (e) {
      console.error(e);
    } finally {
      await channel.close();
    }

    return result;
  }

  async insert(
    collection: string,
    bucket: string,
    result: string,
    content: string,
  ) {
    const channel = this.getIngestChannel();

    try {
      await channel.push(
        collection,
        bucket,
        result,
        content,
        this.SONIC_DEFAULT_OPTIONS,
      );
    } catch (e) {
      console.error(e);
    } finally {
      await channel.close();
    }
  }

  async remove(
    collection: string,
    bucket: string,
    result: string,
    content: string,
  ) {
    const channel = this.getIngestChannel();

    try {
      await channel.pop(collection, bucket, result, content);
    } catch (e) {
      console.error(e);
    } finally {
      await channel.close();
    }
  }

  private getConnectionInfo() {
    const host = process.env.SONIC_HOST ?? '127.0.0.1';
    const port = process.env.SONIC_PORT ?? '1491';

    return {
      host,
      auth: process.env.SONIC_SECRET,
      port: Number.parseInt(port),
    };
  }

  private getSearchChannel() {
    return new Search(this.getConnectionInfo()).connect({
      connected: () => console.log('Sonic: connection established'),
      error: () => console.log('Sonic: connection not established'),
    });
  }

  private getIngestChannel() {
    return new Ingest(this.getConnectionInfo()).connect({
      connected: () => console.log('Sonic: connection established'),
      error: () => console.log('Sonic: connection not established'),
    });
  }
}
