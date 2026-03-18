# Performance Test Report

## 1. Objective

The goal of this test was to evaluate the performance of the following endpoint under load:

GET https://reqres.in/api/users?page=1

The test aimed to analyze:

* response time (P50, P95, P99)
* throughput
* error rate
* system behavior under concurrent load

---

## 2. Test Setup

**Tool:** k6
**Protocol:** HTTP
**Authentication:** x-api-key header

### Load profile

Multiple scenarios were executed:

| Scenario | Virtual Users | Duration | Approx. RPS |
| -------- | ------------- | -------- | ----------- |
| A        | 100           | 3 min    | ~95 req/s   |
| B        | 100           | 1 min    | ~93 req/s   |
| C        | 10            | 1 min    | ~8 req/s    |

Each virtual user performed approximately 1 request per second.

---

## 3. Metrics Collected

* Response time (avg, median, P90, P95)
* Throughput (requests per second)
* Error rate
* Status code distribution

---

## 4. Results Summary

### Scenario A (100 VUs, 3 min)

* ~17,000 requests executed
* ~95 requests/sec
* ~99.8% responses = HTTP 429
* minimal number of HTTP 200 responses

### Scenario B (100 VUs, 1 min)

* similar behavior to Scenario A
* no improvement in success rate
* confirms issue is not time-dependent

### Scenario C (10 VUs, 1 min)

* ~8 requests/sec
* 100% responses = HTTP 429
* no successful responses observed

---

## 5. Status Code Distribution

Across all scenarios:

* HTTP 429 (Too Many Requests) – dominant response
* HTTP 200 – very rare
* HTTP 500 – occasional and negligible

This clearly indicates aggressive rate limiting.

---

## 6. Latency Analysis

### Overall latency (all responses)

Example values:

* avg: ~50 ms
* median: ~35 ms
* P95: ~110–120 ms

These values appear low, but are misleading.

### Latency for successful responses only

* avg: ~150–350 ms
* P95: up to ~500 ms

This reflects the actual processing time of valid requests.

---

## 7. Key Observations

* The API enforces strict rate limiting (HTTP 429) under all tested conditions
* Even low traffic (~8 req/s) results in 100% rejection
* Latency metrics are dominated by fast failure responses
* Rejected requests still show measurable latency, indicating partial processing
* Test duration does not affect the outcome

---

## 8. Interpretation

The system under test does not process the majority of requests due to enforced rate limiting.

Therefore:

* throughput is achieved at the client level
* but not accepted at the server level

This means the test primarily measures:

* API access policy
* not backend scalability or performance

---

## 9. Limitations

* The test was executed against a public demo API
* The environment enforces unknown rate limits
* No control over backend infrastructure
* Results are not representative of production systems

---

## 10. Recommendations

* Use a controlled environment without rate limiting for proper load testing
* Validate API limits and authentication requirements before testing
* Include status code distribution in every performance report
* Separate:

  * transport-level success (requests sent)
  * business-level success (valid responses)

---

## 11. Conclusion

The API rejects most traffic due to aggressive rate limiting, even at low request rates.

As a result, this test demonstrates environmental constraints rather than true system performance.

Meaningful performance evaluation would require access to a non-restricted environment.
