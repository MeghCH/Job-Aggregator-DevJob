// Fetch — appeler l'API WeLoveDevs avec ta clé API, récupérer les offres en paginant (page par page) avec await delay(1000) entre chaque requête.    
                                                                                                                                                     
//   Normaliser — transformer chaque offre brute en ton format standard :                                                                               
//   - title → .trim(), valeur par défaut si vide
//   - salary_min/max → convertir en entier, null si absent                                                                                             
//   - currency → forcer "EUR" si absent                   
//   - skills → s'assurer que c'est bien un tableau (parfois c'est une string)                                                                          
//   - created_at → convertir en date ISO 8601                                                                                                          
//   - remote_type → normaliser les valeurs ("remote", "hybrid", "onsite")                                                                              
                                                                                                                                                     
//   Déduplication — avant chaque INSERT, faire un SELECT id FROM jobs_wld WHERE id = ? et ignorer si déjà présent (ou utiliser INSERT IGNORE).