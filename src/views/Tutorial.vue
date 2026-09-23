<script setup lang="ts">
import IconForward from '~icons/material-symbols/arrow-forward'

const emit = defineEmits(['done'])
</script>

<template>
  <div class="bg-white p-4 md:p-8">
    <h2 class="text-lg!">Jak funguje web Vyber si Olomouc?</h2>
    <p>
      Předvolební kompas je online nástroj, který porovnává vaše postoje ke konkrétním otázkám s postoji kandidujících. Srovnávají se odpovědi (ano, ne či nevím) na otázky, které se budou v následujícím volebním období v Olomouci řešit. Někteří z kandidátstva ke svým odpovědím přidali krátký komentář. Můžete si jej přečíst na stránce s vyhodnocením. Kompas tak nabízí další možnost, jak se před volbami seznámit s postoji kandidujících.</p>
<p>Z každé kandidátní listiny jsme k vyplnění kompasu vyzvali prvních pět kandidujících. Za některá uskupení neodpověděl nikdo, za jiná jsme získali jednu či více odpovědí.</p>
<p>Kompas nemá ambici postihnout názory všech kandidujících ani nahrazovat volební programy jednotlivých uskupení. Výsledky zachycují pouze postoje těch, kteří na dotazník odpověděli. Nástroj má voličkám a voličům nabídnout další zdroj informací, který mohou využít vedle volebních programů, veřejných debat a dalších dostupných informací.

    </p>

    <!-- <h2 class="mt-4 text-lg!">Jak vyhodnocujeme shodu?</h2>
    <p>
      Eine Zustimmung entspricht der Option „ja, finde ich auch“. Eine Ablehnung
      und Enthaltung wird nach Begründung der Fraktion in Beschlussempfehlungen
      und Plenardebatten in „nein, das geht mir nevím“ bzw. „nein, das reicht
      mir nicht aus“ geteilt.
    </p>

    <h2 class="mt-8 text-lg!">Příklad</h2>
    <p>
      „Bürgergeldempfänger*innen, die wiederholt eine existenzsichernde Arbeit
      ablehnen, soll für zwei Monate der komplette Regelsatz des Bürgergelds
      gestrichen werden.“
    </p>

    <div class="mt-2 space-y-2">
      <p>
        <strong>Ano</strong>: Die Fraktion hat dem Antrag
        zugestimmt
      </p>
      <p>
        <strong>Nevím</strong>: Die Fraktion hat den Antrag
        abgelehnt oder sich enthalten und begründet dies damit, dass diese
        Sanktionierung von Bürgergeldempfänger*innen zu weitreichend ist.
      </p>
      <p>
        <strong>Ne</strong>: Die Fraktion hat den Antrag
        abgelehnt oder sich enthalten und begründet dies damit, dass diese
        Sanktionierung von Bürgergeldempfänger*innen ano geht. Es
        sollen stärkere Maßnahmen ergriffen werden.
      </p>
      <p>
          
      </p> 
    </div>-->

    <button class="btn mt-4" @click="$emit('done')">
      <IconForward aria-hidden="true" class="me-1" />
      Pokračovat
    </button>
  </div>
</template>
