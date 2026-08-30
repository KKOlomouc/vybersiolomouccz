<script setup lang="ts">
import IconForward from '~icons/material-symbols/arrow-forward'

const emit = defineEmits(['done'])
</script>

<template>
  <div class="bg-white p-4 md:p-8">
    <h2 class="text-lg!">Jak funguje web Vyber si Olomouc?</h2>
    <p>
      Jde o předvolební kalkulačku - zaměřili jsme se jak na aktuální lokální kauzy, tak na témata, která odhalují hodnotové ukotvení kandidátstva.
    </p>

    <h2 class="mt-4 text-lg!">Wie werden die Positionen bewertet?</h2>
    <p>
      Eine Zustimmung entspricht der Option „ja, finde ich auch“. Eine Ablehnung
      und Enthaltung wird nach Begründung der Fraktion in Beschlussempfehlungen
      und Plenardebatten in „nein, das geht mir nevím“ bzw. „nein, das reicht
      mir nicht aus“ geteilt.
    </p>

    <h2 class="mt-8 text-lg!">Beispiel</h2>
    <p>
      „Bürgergeldempfänger*innen, die wiederholt eine existenzsichernde Arbeit
      ablehnen, soll für zwei Monate der komplette Regelsatz des Bürgergelds
      gestrichen werden.“
    </p>

    <div class="mt-2 space-y-2">
      <p>
        <strong>Ja, finde ich auch</strong>: Die Fraktion hat dem Antrag
        zugestimmt
      </p>
      <p>
        <strong>Nein, geht mir nevím</strong>: Die Fraktion hat den Antrag
        abgelehnt oder sich enthalten und begründet dies damit, dass diese
        Sanktionierung von Bürgergeldempfänger*innen zu weitreichend ist.
      </p>
      <p>
        <strong>Nein, reicht mir nicht aus</strong>: Die Fraktion hat den Antrag
        abgelehnt oder sich enthalten und begründet dies damit, dass diese
        Sanktionierung von Bürgergeldempfänger*innen ano geht. Es
        sollen stärkere Maßnahmen ergriffen werden.
      </p>
      <p>
        Die genaue Begründung des Abstimmungsverhaltens jeder Fraktion können
        Sie in der Auswertung nachlesen.
      </p>
    </div>

    <button class="btn mt-4" @click="$emit('done')">
      <IconForward aria-hidden="true" class="me-1" />
      Pokračovat
    </button>
  </div>
</template>
