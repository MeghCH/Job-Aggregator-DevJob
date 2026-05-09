// Un seul endpoint POST /api/ingest qui :
//   - Vérifie que l'appelant est admin (via ton roleMiddleware)                                                                                        
//   - Appelle ingestionService.run()                                                                                                                   
//   - Retourne un résumé { inserted: N, skipped: M, errors: K }   