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
            "date": {
              "type": "string"
            },
            "due_date": {
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
            "items": {
              "type": "array",
              "items": {
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
            "date",
            "due_date",
            "status"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "invoice_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "due_date": {
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
                "cancelled",
                ""
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
              "type": "number"
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
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
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
            "id",
            "collectionId",
            "collectionName"
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
          "type": "object",
          "properties": {
            "invoice_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "due_date": {
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
                "cancelled",
                ""
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
              "type": "number"
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
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
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
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
            "invoice_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "due_date": {
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
                "cancelled",
                ""
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
              "type": "number"
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
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "invoice": {
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
                  },
                  "id": {
                    "type": "string"
                  },
                  "collectionId": {
                    "type": "string"
                  },
                  "collectionName": {
                    "type": "string"
                  }
                },
                "required": [
                  "invoice",
                  "description",
                  "quantity",
                  "rate",
                  "order",
                  "id",
                  "collectionId",
                  "collectionName"
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
                      "type": "string"
                    },
                    "updated": {
                      "type": "string"
                    },
                    "id": {
                      "type": "string"
                    },
                    "collectionId": {
                      "type": "string"
                    },
                    "collectionName": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "name",
                    "address",
                    "email",
                    "phone",
                    "created",
                    "updated",
                    "id",
                    "collectionId",
                    "collectionName"
                  ],
                  "additionalProperties": false
                }
              },
              "additionalProperties": false
            }
          },
          "required": [
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
            "id",
            "collectionId",
            "collectionName",
            "items"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
            "allOf": [
              {
                "type": "object",
                "properties": {
                  "invoice_number": {
                    "type": "string"
                  },
                  "bill_to": {
                    "type": "string"
                  },
                  "date": {
                    "type": "string"
                  },
                  "due_date": {
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
                      "cancelled",
                      ""
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
                    "type": "number"
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
                  "created": {
                    "type": "string"
                  },
                  "updated": {
                    "type": "string"
                  },
                  "subtotal": {},
                  "item_count": {},
                  "calculated_tax": {},
                  "calculated_discount": {},
                  "calculated_shipping": {},
                  "id": {
                    "type": "string"
                  },
                  "collectionId": {
                    "type": "string"
                  },
                  "collectionName": {
                    "type": "string"
                  },
                  "expand": {
                    "type": "object",
                    "properties": {
                      "bill_to": {
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
                          },
                          "created": {
                            "type": "string"
                          },
                          "updated": {
                            "type": "string"
                          },
                          "id": {
                            "type": "string"
                          },
                          "collectionId": {
                            "type": "string"
                          },
                          "collectionName": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "name",
                          "address",
                          "email",
                          "phone",
                          "created",
                          "updated",
                          "id",
                          "collectionId",
                          "collectionName"
                        ]
                      }
                    }
                  }
                },
                "required": [
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
                  "calculated_shipping",
                  "id",
                  "collectionId",
                  "collectionName"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "subtotal": {
                    "type": "number"
                  }
                },
                "required": [
                  "subtotal"
                ]
              }
            ]
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
        "NO_CONTENT": true,
        "NOT_FOUND": true
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
            "invoice_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "due_date": {
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
            "invoice_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
              "type": "string"
            },
            "due_date": {
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
                "cancelled",
                ""
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
              "type": "number"
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
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
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
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
            "invoice": {
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "invoice",
            "description",
            "quantity",
            "rate",
            "order",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "invoice": {
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "invoice",
            "description",
            "quantity",
            "rate",
            "order",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
              "invoice": {
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
              },
              "id": {
                "type": "string"
              },
              "collectionId": {
                "type": "string"
              },
              "collectionName": {
                "type": "string"
              }
            },
            "required": [
              "invoice",
              "description",
              "quantity",
              "rate",
              "order",
              "id",
              "collectionId",
              "collectionName"
            ],
            "additionalProperties": false
          }
        },
        "NOT_FOUND": true
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
        "NO_CONTENT": true,
        "NOT_FOUND": true
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
        },
        "NOT_FOUND": true
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
            "invoice": {
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
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
            "invoice": {
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "invoice",
            "description",
            "quantity",
            "rate",
            "order",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
            "date": {
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
            "items": {
              "type": "array",
              "items": {
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
            "date",
            "status"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "receipt_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
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
                "cancelled",
                ""
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
              "type": "number"
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
              "type": "number"
            },
            "shipping_amount": {
              "type": "number"
            },
            "amount_paid": {
              "type": "number"
            },
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
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
            "id",
            "collectionId",
            "collectionName"
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
          "type": "object",
          "properties": {
            "receipt_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
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
                "cancelled",
                ""
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
              "type": "number"
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
              "type": "number"
            },
            "shipping_amount": {
              "type": "number"
            },
            "amount_paid": {
              "type": "number"
            },
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
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
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
            "receipt_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
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
                "cancelled",
                ""
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
              "type": "number"
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
              "type": "number"
            },
            "shipping_amount": {
              "type": "number"
            },
            "amount_paid": {
              "type": "number"
            },
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            },
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "receipt": {
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
                  },
                  "id": {
                    "type": "string"
                  },
                  "collectionId": {
                    "type": "string"
                  },
                  "collectionName": {
                    "type": "string"
                  }
                },
                "required": [
                  "receipt",
                  "description",
                  "quantity",
                  "rate",
                  "order",
                  "id",
                  "collectionId",
                  "collectionName"
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
                      "type": "string"
                    },
                    "updated": {
                      "type": "string"
                    },
                    "id": {
                      "type": "string"
                    },
                    "collectionId": {
                      "type": "string"
                    },
                    "collectionName": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "name",
                    "address",
                    "email",
                    "phone",
                    "created",
                    "updated",
                    "id",
                    "collectionId",
                    "collectionName"
                  ],
                  "additionalProperties": false
                }
              },
              "additionalProperties": false
            }
          },
          "required": [
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
            "id",
            "collectionId",
            "collectionName",
            "items"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
            "allOf": [
              {
                "type": "object",
                "properties": {
                  "receipt_number": {
                    "type": "string"
                  },
                  "bill_to": {
                    "type": "string"
                  },
                  "date": {
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
                      "cancelled",
                      ""
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
                    "type": "number"
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
                    "type": "number"
                  },
                  "shipping_amount": {
                    "type": "number"
                  },
                  "amount_paid": {
                    "type": "number"
                  },
                  "created": {
                    "type": "string"
                  },
                  "updated": {
                    "type": "string"
                  },
                  "subtotal": {},
                  "item_count": {},
                  "calculated_tax": {},
                  "calculated_discount": {},
                  "calculated_shipping": {},
                  "id": {
                    "type": "string"
                  },
                  "collectionId": {
                    "type": "string"
                  },
                  "collectionName": {
                    "type": "string"
                  },
                  "expand": {
                    "type": "object",
                    "properties": {
                      "bill_to": {
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
                          },
                          "created": {
                            "type": "string"
                          },
                          "updated": {
                            "type": "string"
                          },
                          "id": {
                            "type": "string"
                          },
                          "collectionId": {
                            "type": "string"
                          },
                          "collectionName": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "name",
                          "address",
                          "email",
                          "phone",
                          "created",
                          "updated",
                          "id",
                          "collectionId",
                          "collectionName"
                        ]
                      }
                    }
                  }
                },
                "required": [
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
                  "calculated_shipping",
                  "id",
                  "collectionId",
                  "collectionName"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "subtotal": {
                    "type": "number"
                  }
                },
                "required": [
                  "subtotal"
                ]
              }
            ]
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
        "NO_CONTENT": true,
        "NOT_FOUND": true
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
            "receipt_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
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
            "receipt_number": {
              "type": "string"
            },
            "bill_to": {
              "type": "string"
            },
            "date": {
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
                "cancelled",
                ""
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
              "type": "number"
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
              "type": "number"
            },
            "shipping_amount": {
              "type": "number"
            },
            "amount_paid": {
              "type": "number"
            },
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
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
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
            "receipt": {
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "receipt",
            "description",
            "quantity",
            "rate",
            "order",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "CREATED": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "receipt": {
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "receipt",
            "description",
            "quantity",
            "rate",
            "order",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
              "receipt": {
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
              },
              "id": {
                "type": "string"
              },
              "collectionId": {
                "type": "string"
              },
              "collectionName": {
                "type": "string"
              }
            },
            "required": [
              "receipt",
              "description",
              "quantity",
              "rate",
              "order",
              "id",
              "collectionId",
              "collectionName"
            ],
            "additionalProperties": false
          }
        },
        "NOT_FOUND": true
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
        "NO_CONTENT": true,
        "NOT_FOUND": true
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
        },
        "NOT_FOUND": true
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
            "receipt": {
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
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
            "receipt": {
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "receipt",
            "description",
            "quantity",
            "rate",
            "order",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "address",
            "email",
            "phone",
            "created",
            "updated",
            "id",
            "collectionId",
            "collectionName"
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
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "address",
            "email",
            "phone",
            "created",
            "updated",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
                "type": "string"
              },
              "updated": {
                "type": "string"
              },
              "id": {
                "type": "string"
              },
              "collectionId": {
                "type": "string"
              },
              "collectionName": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "address",
              "email",
              "phone",
              "created",
              "updated",
              "id",
              "collectionId",
              "collectionName"
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
        "NO_CONTENT": true,
        "CONFLICT": true,
        "NOT_FOUND": true
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
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "address",
            "email",
            "phone",
            "created",
            "updated",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        },
        "NOT_FOUND": true
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
            },
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
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
            "updated",
            "id",
            "collectionId",
            "collectionName"
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
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
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
            },
            "created": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "collectionId": {
              "type": "string"
            },
            "collectionName": {
              "type": "string"
            }
          },
          "required": [
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
            "updated",
            "id",
            "collectionId",
            "collectionName"
          ],
          "additionalProperties": false
        }
      }
    }
  }
} as const

export default contract
