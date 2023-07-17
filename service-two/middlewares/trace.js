import Tracer from '@opentelemetry/api';
import semanticConventions from '@opentelemetry/semantic-conventions'

const { SemanticAttributes } = semanticConventions

export function traceUser(req, _res, next) {
const span = Tracer.trace.getActiveSpan();
  if (req.headers.authorization) {
    const [, payload] = req.headers.authorization.split('.');
    const { user_id } = JSON.parse(Buffer.from(payload, 'base64').toString());
    span.setAttribute(SemanticAttributes.ENDUSER_ID, user_id)
  }

  next()
}
