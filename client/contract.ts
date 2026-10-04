export const contract = {
  "invoices": {
    "create": {
      "method": "post",
      "description": "Create a new invoice",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "bill_to": {
              "type": "string"
            },
            "payment_terms": {
              "type": "string"
            },
            "po_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "sent",
                "paid",
                "overdue",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed"
              ]
            },
            "tax_amount": {
              "type": "number"
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed"
              ]
            },
            "discount_amount": {
              "type": "number"
            },
            "shipping_amount": {
              "type": "number"
            },
            "amount_paid": {
              "type": "number"
            },
            "notes": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "due_date": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "quantity": {
                    "type": "number"
                  },
                  "rate": {
                    "type": "number"
                  },
                  "order": {
                    "type": "number"
                  }
                },
                "required": [
                  "description",
                  "quantity",
                  "rate",
                  "order"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": [
            "status",
            "date",
            "due_date"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "invoice_number": {
              "type": "string"
            },
            "bill_to": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "date": {
              "type": "string",
              "format": "date-time"
            },
            "due_date": {
              "type": "string",
              "format": "date-time"
            },
            "payment_terms": {
              "type": "string"
            },
            "po_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "sent",
                "paid",
                "overdue",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "tax_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "discount_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "shipping_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "amount_paid": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "notes": {
              "type": "string"
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "invoice_number",
            "bill_to",
            "date",
            "due_date",
            "payment_terms",
            "po_number",
            "status",
            "shipping_address",
            "tax_type",
            "tax_amount",
            "discount_type",
            "discount_amount",
            "shipping_amount",
            "amount_paid",
            "notes",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    },
    "duplicate": {
      "method": "post",
      "description": "Duplicate an existing invoice",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "null"
        }
      }
    },
    "getById": {
      "method": "get",
      "description": "Get invoice by ID with items",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "invoice_number": {
              "type": "string"
            },
            "bill_to": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "date": {
              "type": "string",
              "format": "date-time"
            },
            "due_date": {
              "type": "string",
              "format": "date-time"
            },
            "payment_terms": {
              "type": "string"
            },
            "po_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "sent",
                "paid",
                "overdue",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "tax_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "discount_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "shipping_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "amount_paid": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "notes": {
              "type": "string"
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                  },
                  "invoice": {
                    "anyOf": [
                      {
                        "type": "string",
                        "format": "uuid",
                        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "description": {
                    "type": "string"
                  },
                  "quantity": {
                    "type": "number",
                    "minimum": -140737488355328,
                    "maximum": 140737488355327
                  },
                  "rate": {
                    "type": "number",
                    "minimum": -140737488355328,
                    "maximum": 140737488355327
                  },
                  "order": {
                    "type": "integer",
                    "minimum": -2147483648,
                    "maximum": 2147483647
                  }
                },
                "required": [
                  "id",
                  "invoice",
                  "description",
                  "quantity",
                  "rate",
                  "order"
                ],
                "additionalProperties": false
              }
            },
            "expand": {
              "type": "object",
              "properties": {
                "bill_to": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                    },
                    "name": {
                      "type": "string"
                    },
                    "address": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "phone": {
                      "type": "string"
                    },
                    "created": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "updated": {
                      "type": "string",
                      "format": "date-time"
                    }
                  },
                  "required": [
                    "id",
                    "name",
                    "address",
                    "email",
                    "phone",
                    "created",
                    "updated"
                  ],
                  "additionalProperties": false
                }
              },
              "additionalProperties": false
            }
          },
          "required": [
            "id",
            "invoice_number",
            "bill_to",
            "date",
            "due_date",
            "payment_terms",
            "po_number",
            "status",
            "shipping_address",
            "tax_type",
            "tax_amount",
            "discount_type",
            "discount_amount",
            "shipping_amount",
            "amount_paid",
            "notes",
            "created",
            "updated",
            "items"
          ],
          "additionalProperties": false
        }
      }
    },
    "list": {
      "method": "get",
      "description": "List all invoices",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "sent",
                "paid",
                "overdue",
                "cancelled"
              ]
            },
            "clientId": {
              "type": "string"
            },
            "search": {
              "type": "string"
            }
          },
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
              },
              "invoice_number": {
                "type": "string"
              },
              "bill_to": {
                "anyOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "date": {
                "type": "string",
                "format": "date-time"
              },
              "due_date": {
                "type": "string",
                "format": "date-time"
              },
              "payment_terms": {
                "type": "string"
              },
              "po_number": {
                "type": "string"
              },
              "status": {
                "type": "string",
                "enum": [
                  "draft",
                  "sent",
                  "paid",
                  "overdue",
                  "cancelled"
                ]
              },
              "shipping_address": {
                "type": "string"
              },
              "tax_type": {
                "type": "string",
                "enum": [
                  "rate",
                  "fixed",
                  ""
                ]
              },
              "tax_amount": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "discount_type": {
                "type": "string",
                "enum": [
                  "rate",
                  "fixed",
                  ""
                ]
              },
              "discount_amount": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "shipping_amount": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "amount_paid": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "notes": {
                "type": "string"
              },
              "created": {
                "type": "string",
                "format": "date-time"
              },
              "updated": {
                "type": "string",
                "format": "date-time"
              },
              "subtotal": {
                "type": "number"
              },
              "item_count": {
                "type": "number"
              },
              "calculated_tax": {
                "type": "number"
              },
              "calculated_discount": {
                "type": "number"
              },
              "calculated_shipping": {
                "type": "number"
              },
              "expand": {
                "type": "object",
                "properties": {
                  "bill_to": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                      },
                      "name": {
                        "type": "string"
                      },
                      "address": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "phone": {
                        "type": "string"
                      },
                      "created": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "updated": {
                        "type": "string",
                        "format": "date-time"
                      }
                    },
                    "required": [
                      "id",
                      "name",
                      "address",
                      "email",
                      "phone",
                      "created",
                      "updated"
                    ],
                    "additionalProperties": false
                  }
                },
                "additionalProperties": false
              }
            },
            "required": [
              "id",
              "invoice_number",
              "bill_to",
              "date",
              "due_date",
              "payment_terms",
              "po_number",
              "status",
              "shipping_address",
              "tax_type",
              "tax_amount",
              "discount_type",
              "discount_amount",
              "shipping_amount",
              "amount_paid",
              "notes",
              "created",
              "updated",
              "subtotal",
              "item_count",
              "calculated_tax",
              "calculated_discount",
              "calculated_shipping"
            ],
            "additionalProperties": false
          }
        }
      }
    },
    "remove": {
      "method": "post",
      "description": "Delete an invoice",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "NO_CONTENT": true
      }
    },
    "update": {
      "method": "post",
      "description": "Update an existing invoice",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        },
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "bill_to": {
              "type": "string"
            },
            "payment_terms": {
              "type": "string"
            },
            "po_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "sent",
                "paid",
                "overdue",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed"
              ]
            },
            "tax_amount": {
              "type": "number"
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed"
              ]
            },
            "discount_amount": {
              "type": "number"
            },
            "shipping_amount": {
              "type": "number"
            },
            "amount_paid": {
              "type": "number"
            },
            "notes": {
              "type": "string"
            },
            "invoice_number": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "due_date": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "quantity": {
                    "type": "number"
                  },
                  "rate": {
                    "type": "number"
                  },
                  "order": {
                    "type": "number"
                  }
                },
                "required": [
                  "description",
                  "quantity",
                  "rate",
                  "order"
                ],
                "additionalProperties": false
              }
            }
          },
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "invoice_number": {
              "type": "string"
            },
            "bill_to": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "date": {
              "type": "string",
              "format": "date-time"
            },
            "due_date": {
              "type": "string",
              "format": "date-time"
            },
            "payment_terms": {
              "type": "string"
            },
            "po_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "sent",
                "paid",
                "overdue",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "tax_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "discount_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "shipping_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "amount_paid": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "notes": {
              "type": "string"
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "invoice_number",
            "bill_to",
            "date",
            "due_date",
            "payment_terms",
            "po_number",
            "status",
            "shipping_address",
            "tax_type",
            "tax_amount",
            "discount_type",
            "discount_amount",
            "shipping_amount",
            "amount_paid",
            "notes",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "items": {
    "create": {
      "method": "post",
      "description": "Create a new line item",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "description": {
              "type": "string"
            },
            "quantity": {
              "type": "number"
            },
            "rate": {
              "type": "number"
            },
            "order": {
              "type": "number"
            },
            "invoice": {
              "type": "string"
            }
          },
          "required": [
            "description",
            "quantity",
            "rate",
            "order",
            "invoice"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "invoice": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "description": {
              "type": "string"
            },
            "quantity": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "rate": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "order": {
              "type": "integer",
              "minimum": -2147483648,
              "maximum": 2147483647
            }
          },
          "required": [
            "id",
            "invoice",
            "description",
            "quantity",
            "rate",
            "order"
          ],
          "additionalProperties": false
        }
      }
    },
    "listByInvoice": {
      "method": "get",
      "description": "List all items for an invoice",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "invoiceId": {
              "type": "string"
            }
          },
          "required": [
            "invoiceId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
              },
              "invoice": {
                "anyOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "description": {
                "type": "string"
              },
              "quantity": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "rate": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "order": {
                "type": "integer",
                "minimum": -2147483648,
                "maximum": 2147483647
              }
            },
            "required": [
              "id",
              "invoice",
              "description",
              "quantity",
              "rate",
              "order"
            ],
            "additionalProperties": false
          }
        }
      }
    },
    "remove": {
      "method": "post",
      "description": "Delete a line item",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "NO_CONTENT": true
      }
    },
    "reorder": {
      "method": "post",
      "description": "Reorder line items",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "invoiceId": {
              "type": "string"
            },
            "itemIds": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "invoiceId",
            "itemIds"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean"
            }
          },
          "required": [
            "success"
          ],
          "additionalProperties": false
        }
      }
    },
    "update": {
      "method": "post",
      "description": "Update an existing line item",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        },
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "description": {
              "type": "string"
            },
            "quantity": {
              "type": "number"
            },
            "rate": {
              "type": "number"
            },
            "order": {
              "type": "number"
            }
          },
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "invoice": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "description": {
              "type": "string"
            },
            "quantity": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "rate": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "order": {
              "type": "integer",
              "minimum": -2147483648,
              "maximum": 2147483647
            }
          },
          "required": [
            "id",
            "invoice",
            "description",
            "quantity",
            "rate",
            "order"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "receipts": {
    "create": {
      "method": "post",
      "description": "Create a new receipt",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "bill_to": {
              "type": "string"
            },
            "payment_method": {
              "type": "string"
            },
            "payment_terms": {
              "type": "string"
            },
            "reference_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "issued",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed"
              ]
            },
            "tax_amount": {
              "type": "number"
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed"
              ]
            },
            "discount_amount": {
              "type": "number"
            },
            "shipping_amount": {
              "type": "number"
            },
            "amount_paid": {
              "type": "number"
            },
            "date": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "quantity": {
                    "type": "number"
                  },
                  "rate": {
                    "type": "number"
                  },
                  "order": {
                    "type": "number"
                  }
                },
                "required": [
                  "description",
                  "quantity",
                  "rate",
                  "order"
                ],
                "additionalProperties": false
              }
            }
          },
          "required": [
            "status",
            "date"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "receipt_number": {
              "type": "string"
            },
            "bill_to": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "date": {
              "type": "string",
              "format": "date-time"
            },
            "payment_method": {
              "type": "string"
            },
            "payment_terms": {
              "type": "string"
            },
            "reference_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "issued",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "tax_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "discount_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "shipping_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "amount_paid": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "receipt_number",
            "bill_to",
            "date",
            "payment_method",
            "payment_terms",
            "reference_number",
            "status",
            "shipping_address",
            "tax_type",
            "tax_amount",
            "discount_type",
            "discount_amount",
            "shipping_amount",
            "amount_paid",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    },
    "duplicate": {
      "method": "post",
      "description": "Duplicate an existing receipt",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "null"
        }
      }
    },
    "getById": {
      "method": "get",
      "description": "Get receipt by ID with items",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "receipt_number": {
              "type": "string"
            },
            "bill_to": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "date": {
              "type": "string",
              "format": "date-time"
            },
            "payment_method": {
              "type": "string"
            },
            "payment_terms": {
              "type": "string"
            },
            "reference_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "issued",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "tax_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "discount_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "shipping_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "amount_paid": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                  },
                  "receipt": {
                    "anyOf": [
                      {
                        "type": "string",
                        "format": "uuid",
                        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "description": {
                    "type": "string"
                  },
                  "quantity": {
                    "type": "number",
                    "minimum": -140737488355328,
                    "maximum": 140737488355327
                  },
                  "rate": {
                    "type": "number",
                    "minimum": -140737488355328,
                    "maximum": 140737488355327
                  },
                  "order": {
                    "type": "integer",
                    "minimum": -2147483648,
                    "maximum": 2147483647
                  }
                },
                "required": [
                  "id",
                  "receipt",
                  "description",
                  "quantity",
                  "rate",
                  "order"
                ],
                "additionalProperties": false
              }
            },
            "expand": {
              "type": "object",
              "properties": {
                "bill_to": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                    },
                    "name": {
                      "type": "string"
                    },
                    "address": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "phone": {
                      "type": "string"
                    },
                    "created": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "updated": {
                      "type": "string",
                      "format": "date-time"
                    }
                  },
                  "required": [
                    "id",
                    "name",
                    "address",
                    "email",
                    "phone",
                    "created",
                    "updated"
                  ],
                  "additionalProperties": false
                }
              },
              "additionalProperties": false
            }
          },
          "required": [
            "id",
            "receipt_number",
            "bill_to",
            "date",
            "payment_method",
            "payment_terms",
            "reference_number",
            "status",
            "shipping_address",
            "tax_type",
            "tax_amount",
            "discount_type",
            "discount_amount",
            "shipping_amount",
            "amount_paid",
            "created",
            "updated",
            "items"
          ],
          "additionalProperties": false
        }
      }
    },
    "list": {
      "method": "get",
      "description": "List all receipts",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "issued",
                "cancelled"
              ]
            },
            "clientId": {
              "type": "string"
            },
            "search": {
              "type": "string"
            }
          },
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
              },
              "receipt_number": {
                "type": "string"
              },
              "bill_to": {
                "anyOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "date": {
                "type": "string",
                "format": "date-time"
              },
              "payment_method": {
                "type": "string"
              },
              "payment_terms": {
                "type": "string"
              },
              "reference_number": {
                "type": "string"
              },
              "status": {
                "type": "string",
                "enum": [
                  "draft",
                  "issued",
                  "cancelled"
                ]
              },
              "shipping_address": {
                "type": "string"
              },
              "tax_type": {
                "type": "string",
                "enum": [
                  "rate",
                  "fixed",
                  ""
                ]
              },
              "tax_amount": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "discount_type": {
                "type": "string",
                "enum": [
                  "rate",
                  "fixed",
                  ""
                ]
              },
              "discount_amount": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "shipping_amount": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "amount_paid": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "created": {
                "type": "string",
                "format": "date-time"
              },
              "updated": {
                "type": "string",
                "format": "date-time"
              },
              "subtotal": {
                "type": "number"
              },
              "item_count": {
                "type": "number"
              },
              "calculated_tax": {
                "type": "number"
              },
              "calculated_discount": {
                "type": "number"
              },
              "calculated_shipping": {
                "type": "number"
              },
              "expand": {
                "type": "object",
                "properties": {
                  "bill_to": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                      },
                      "name": {
                        "type": "string"
                      },
                      "address": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "phone": {
                        "type": "string"
                      },
                      "created": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "updated": {
                        "type": "string",
                        "format": "date-time"
                      }
                    },
                    "required": [
                      "id",
                      "name",
                      "address",
                      "email",
                      "phone",
                      "created",
                      "updated"
                    ],
                    "additionalProperties": false
                  }
                },
                "additionalProperties": false
              }
            },
            "required": [
              "id",
              "receipt_number",
              "bill_to",
              "date",
              "payment_method",
              "payment_terms",
              "reference_number",
              "status",
              "shipping_address",
              "tax_type",
              "tax_amount",
              "discount_type",
              "discount_amount",
              "shipping_amount",
              "amount_paid",
              "created",
              "updated",
              "subtotal",
              "item_count",
              "calculated_tax",
              "calculated_discount",
              "calculated_shipping"
            ],
            "additionalProperties": false
          }
        }
      }
    },
    "remove": {
      "method": "post",
      "description": "Delete a receipt",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "NO_CONTENT": true
      }
    },
    "update": {
      "method": "post",
      "description": "Update an existing receipt",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        },
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "bill_to": {
              "type": "string"
            },
            "payment_method": {
              "type": "string"
            },
            "payment_terms": {
              "type": "string"
            },
            "reference_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "issued",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed"
              ]
            },
            "tax_amount": {
              "type": "number"
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed"
              ]
            },
            "discount_amount": {
              "type": "number"
            },
            "shipping_amount": {
              "type": "number"
            },
            "amount_paid": {
              "type": "number"
            },
            "receipt_number": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "quantity": {
                    "type": "number"
                  },
                  "rate": {
                    "type": "number"
                  },
                  "order": {
                    "type": "number"
                  }
                },
                "required": [
                  "description",
                  "quantity",
                  "rate",
                  "order"
                ],
                "additionalProperties": false
              }
            }
          },
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "receipt_number": {
              "type": "string"
            },
            "bill_to": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "date": {
              "type": "string",
              "format": "date-time"
            },
            "payment_method": {
              "type": "string"
            },
            "payment_terms": {
              "type": "string"
            },
            "reference_number": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "draft",
                "issued",
                "cancelled"
              ]
            },
            "shipping_address": {
              "type": "string"
            },
            "tax_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "tax_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "discount_type": {
              "type": "string",
              "enum": [
                "rate",
                "fixed",
                ""
              ]
            },
            "discount_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "shipping_amount": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "amount_paid": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "receipt_number",
            "bill_to",
            "date",
            "payment_method",
            "payment_terms",
            "reference_number",
            "status",
            "shipping_address",
            "tax_type",
            "tax_amount",
            "discount_type",
            "discount_amount",
            "shipping_amount",
            "amount_paid",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "receiptItems": {
    "create": {
      "method": "post",
      "description": "Create a new line item for a receipt",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "description": {
              "type": "string"
            },
            "quantity": {
              "type": "number"
            },
            "rate": {
              "type": "number"
            },
            "order": {
              "type": "number"
            },
            "receipt": {
              "type": "string"
            }
          },
          "required": [
            "description",
            "quantity",
            "rate",
            "order",
            "receipt"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "receipt": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "description": {
              "type": "string"
            },
            "quantity": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "rate": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "order": {
              "type": "integer",
              "minimum": -2147483648,
              "maximum": 2147483647
            }
          },
          "required": [
            "id",
            "receipt",
            "description",
            "quantity",
            "rate",
            "order"
          ],
          "additionalProperties": false
        }
      }
    },
    "listByReceipt": {
      "method": "get",
      "description": "List all items for a receipt",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "receiptId": {
              "type": "string"
            }
          },
          "required": [
            "receiptId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
              },
              "receipt": {
                "anyOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "description": {
                "type": "string"
              },
              "quantity": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "rate": {
                "type": "number",
                "minimum": -140737488355328,
                "maximum": 140737488355327
              },
              "order": {
                "type": "integer",
                "minimum": -2147483648,
                "maximum": 2147483647
              }
            },
            "required": [
              "id",
              "receipt",
              "description",
              "quantity",
              "rate",
              "order"
            ],
            "additionalProperties": false
          }
        }
      }
    },
    "remove": {
      "method": "post",
      "description": "Delete a line item from a receipt",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "NO_CONTENT": true
      }
    },
    "reorder": {
      "method": "post",
      "description": "Reorder receipt line items",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "receiptId": {
              "type": "string"
            },
            "itemIds": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "receiptId",
            "itemIds"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean"
            }
          },
          "required": [
            "success"
          ],
          "additionalProperties": false
        }
      }
    },
    "update": {
      "method": "post",
      "description": "Update an existing line item for a receipt",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        },
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "description": {
              "type": "string"
            },
            "quantity": {
              "type": "number"
            },
            "rate": {
              "type": "number"
            },
            "order": {
              "type": "number"
            }
          },
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "receipt": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "uuid",
                  "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
                },
                {
                  "type": "null"
                }
              ]
            },
            "description": {
              "type": "string"
            },
            "quantity": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "rate": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "order": {
              "type": "integer",
              "minimum": -2147483648,
              "maximum": 2147483647
            }
          },
          "required": [
            "id",
            "receipt",
            "description",
            "quantity",
            "rate",
            "order"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "clients": {
    "create": {
      "method": "post",
      "description": "Create a new client",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "address",
            "email",
            "phone"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "name": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "name",
            "address",
            "email",
            "phone",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    },
    "getById": {
      "method": "get",
      "description": "Get client by ID",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "name": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "name",
            "address",
            "email",
            "phone",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    },
    "list": {
      "method": "get",
      "description": "List all clients",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {},
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
              },
              "name": {
                "type": "string"
              },
              "address": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "phone": {
                "type": "string"
              },
              "created": {
                "type": "string",
                "format": "date-time"
              },
              "updated": {
                "type": "string",
                "format": "date-time"
              }
            },
            "required": [
              "id",
              "name",
              "address",
              "email",
              "phone",
              "created",
              "updated"
            ],
            "additionalProperties": false
          }
        }
      }
    },
    "remove": {
      "method": "post",
      "description": "Delete a client",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "NO_CONTENT": true
      }
    },
    "update": {
      "method": "post",
      "description": "Update an existing client",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "required": [
            "id"
          ],
          "additionalProperties": false
        },
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "address",
            "email",
            "phone"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "name": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "name",
            "address",
            "email",
            "phone",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    }
  },
  "settings": {
    "get": {
      "method": "get",
      "description": "Get invoice maker settings",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {},
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "company_name": {
              "type": "string"
            },
            "company_address": {
              "type": "string"
            },
            "company_reg_no": {
              "type": "string"
            },
            "company_email": {
              "type": "string"
            },
            "company_tel_no": {
              "type": "string"
            },
            "default_logo": {
              "type": "string"
            },
            "default_payment_terms": {
              "type": "string"
            },
            "default_notes": {
              "type": "string"
            },
            "default_tax_rate": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "bank_name": {
              "type": "string"
            },
            "bank_account": {
              "type": "string"
            },
            "bank_account_name": {
              "type": "string"
            },
            "currency": {
              "type": "string"
            },
            "currency_symbol": {
              "type": "string"
            },
            "invoice_prefix": {
              "type": "string"
            },
            "next_invoice_number": {
              "type": "integer",
              "minimum": -2147483648,
              "maximum": 2147483647
            },
            "receipt_prefix": {
              "type": "string"
            },
            "next_receipt_number": {
              "type": "integer",
              "minimum": -2147483648,
              "maximum": 2147483647
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "company_name",
            "company_address",
            "company_reg_no",
            "company_email",
            "company_tel_no",
            "default_logo",
            "default_payment_terms",
            "default_notes",
            "default_tax_rate",
            "bank_name",
            "bank_account",
            "bank_account_name",
            "currency",
            "currency_symbol",
            "invoice_prefix",
            "next_invoice_number",
            "receipt_prefix",
            "next_receipt_number",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    },
    "update": {
      "method": "post",
      "description": "Update invoice maker settings",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": {
        "default_logo": {
          "optional": true
        }
      },
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "company_name": {
              "type": "string"
            },
            "company_address": {
              "type": "string"
            },
            "company_reg_no": {
              "type": "string"
            },
            "company_email": {
              "type": "string"
            },
            "company_tel_no": {
              "type": "string"
            },
            "default_payment_terms": {
              "type": "string"
            },
            "default_notes": {
              "type": "string"
            },
            "default_tax_rate": {
              "type": "number"
            },
            "bank_name": {
              "type": "string"
            },
            "bank_account": {
              "type": "string"
            },
            "bank_account_name": {
              "type": "string"
            },
            "currency": {
              "type": "string"
            },
            "currency_symbol": {
              "type": "string"
            },
            "invoice_prefix": {
              "type": "string"
            },
            "next_invoice_number": {
              "type": "number"
            },
            "receipt_prefix": {
              "type": "string"
            },
            "next_receipt_number": {
              "type": "number"
            }
          },
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uuid",
              "pattern": "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$"
            },
            "company_name": {
              "type": "string"
            },
            "company_address": {
              "type": "string"
            },
            "company_reg_no": {
              "type": "string"
            },
            "company_email": {
              "type": "string"
            },
            "company_tel_no": {
              "type": "string"
            },
            "default_logo": {
              "type": "string"
            },
            "default_payment_terms": {
              "type": "string"
            },
            "default_notes": {
              "type": "string"
            },
            "default_tax_rate": {
              "type": "number",
              "minimum": -140737488355328,
              "maximum": 140737488355327
            },
            "bank_name": {
              "type": "string"
            },
            "bank_account": {
              "type": "string"
            },
            "bank_account_name": {
              "type": "string"
            },
            "currency": {
              "type": "string"
            },
            "currency_symbol": {
              "type": "string"
            },
            "invoice_prefix": {
              "type": "string"
            },
            "next_invoice_number": {
              "type": "integer",
              "minimum": -2147483648,
              "maximum": 2147483647
            },
            "receipt_prefix": {
              "type": "string"
            },
            "next_receipt_number": {
              "type": "integer",
              "minimum": -2147483648,
              "maximum": 2147483647
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "updated": {
              "type": "string",
              "format": "date-time"
            }
          },
          "required": [
            "id",
            "company_name",
            "company_address",
            "company_reg_no",
            "company_email",
            "company_tel_no",
            "default_logo",
            "default_payment_terms",
            "default_notes",
            "default_tax_rate",
            "bank_name",
            "bank_account",
            "bank_account_name",
            "currency",
            "currency_symbol",
            "invoice_prefix",
            "next_invoice_number",
            "receipt_prefix",
            "next_receipt_number",
            "created",
            "updated"
          ],
          "additionalProperties": false
        }
      }
    }
  }
} as const

export default contract
