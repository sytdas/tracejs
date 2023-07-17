'use strict'
import instrumentationHttp from '@opentelemetry/instrumentation-http';
const { HttpInstrumentation } = instrumentationHttp;
import process from 'process';
import opentelemetry from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import resources from '@opentelemetry/resources';
import semanticConventions from '@opentelemetry/semantic-conventions';
import { TraceExporter as GoogleCloudTraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter';

import exporterZipkin from '@opentelemetry/exporter-zipkin';
const { ZipkinExporter } = exporterZipkin;
const { Resource } = resources;
const { SemanticResourceAttributes } = semanticConventions;
// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package

const traceExporter = process.env.NODE_ENV == 'production' ? new GoogleCloudTraceExporter() : new ZipkinExporter();
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'service-one',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
