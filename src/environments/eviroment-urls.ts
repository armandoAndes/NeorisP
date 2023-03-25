export const enviromentUrls = {
  getPokemons: (idAuthor: string) =>
    `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon?idAuthor=${idAuthor}`,
  createPokemon: `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon`,
  getPokemonById: (idPokemon: string) =>
    `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${idPokemon}`,
  updatePokemonById: (idPokemon: string) =>
    `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${idPokemon}`,
  deletePokemonById: (idPokemon: string) =>
    `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${idPokemon}`,
};
