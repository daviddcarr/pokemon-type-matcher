import { SupportedLanguage } from "@lib/types"

export const SUPPORTED_LANGUAGES = [ "en", "ja", "es", "fr", "it", "de", "ko" ]

type LanguageDict = {
  [key: SupportedLanguage]: string
}

export const LANGUAGE_CLASS: LanguageDict = {
    "en": "gb",
    "ja": "jp",
    "es": "es",
    "fr": "fr",
    "it": "it",
    "de": "de",
    "ko": "kr"
}

export const LANGUAGE_DICT_ATTACKING: LanguageDict = {
    "en": "is Attacking",
    "ja": "攻撃中",
    "es": "está atacando",
    "fr": "attaque",
    "it": "sta attaccando",
    "de": "greift an",
    "ko": "공격 중"
  }

export const LANGUAGE_DICT_CLOSE: LanguageDict = {
  "en": "Close",
  "ja": "閉じる",
  "es": "Cerrar",
  "fr": "Fermer",
  "it": "Chiudi",
  "de": "Schließen",
  "ko": "닫기"
}

export const LANGUAGE_DICT_NONE: LanguageDict = {
  "en": "None",
  "ja": "なし",
  "es": "Ninguno",
  "fr": "Aucun",
  "it": "Nessuno",
  "de": "Keiner",
  "ko": "없음"
}

export const LANGUAGE_DICT_INSTALL: LanguageDict = {
  "en": "Install",
  "ja": "インストール",
  "es": "Instalar",
  "fr": "Installer",
  "it": "Installa",
  "de": "Installieren",
  "ko": "설치"
}

type LanguageDictInfo = {
  [key: SupportedLanguage]: {
    info: string,
    whatTitle: string,
    whatMessage: string,
    howTitle: string,
    pokemonButton: string,
    typeButton: string,
    swapButton: string,
    attackButton: string,
    defenseButton: string,
    pointerArrow: string,
    pointerShield: string,
    installTitle: string,
    iosInstructions: string[],
    androidInstructions: string[],
    whatElse: string,
    disclaimer: string,
  }
}

export const LANGUAGE_DICT_INFO: LanguageDictInfo = {
  "en": {
    info: "Info",
    whatTitle: "What Is This?",
    whatMessage: "PokéType Matcher is a tool to visualize how different Pokémon types affect each other.",
    howTitle: "How Do I Use It?",
    pokemonButton: "Select a Pokemon to autofill types.",
    typeButton: "Select a Main or Dual Type. In Attack Mode, only the Main type is used to calculate damage.",
    swapButton:"Swap Main and Dual Types (Doesn't affect damage in Defense Mode.)",
    attackButton: "Attack Mode: When in this mode the selected type (the one in the center of the wheel) is 'attacking' the types around it. The pointers indicate how the selected type would affect the ones around it.",
    defenseButton: "Defense Mode: When in this mode the selected type(s) are defending against the types around the wheel. The pointers indicate how the surrounding types would affect a Pokémon with the selected types.",
    pointerArrow: "The arrow pointers indicate 'Super Effective' damage and the direction of attack. The '+' indicates that an attack may do quadruple damage.",
    pointerShield: "The shields indicate 'Not Very Effective' damage. The '+' indicates that an attack may do quarter damage.",
    installTitle: "Install on Device",
    iosInstructions: [
      "Tap the 'Share' button",
      "Tap 'Add to Home Screen'",
      "Tap 'Add'"
    ],
    androidInstructions: [
      "Tap the 'Share' button",
      "Tap 'Add to Home Screen'",
      "Tap 'Add'"
    ],
    whatElse: "What Else?",
    disclaimer: "PokéType is a Fan App and is not a product of Nintendo, Game Freak, or The Pokemon Company."
  },
  "ja": {
    info: "情報",
    whatTitle: "これは何ですか？",
    whatMessage: "ポケタイプマッチャーは、異なるポケモンのタイプがどのように影響し合うかを視覚化するツールです。",
    howTitle: "使い方",
    pokemonButton: "ポケモンを選択してタイプを自動入力",
    typeButton: "メインまたはサブタイプを選択。攻撃モードではメインタイプのみがダメージ計算に使用されます。",
    swapButton: "メインとサブタイプを入れ替える（防御モードでは影響なし）",
    attackButton: "攻撃モード：このモードでは、選択したタイプ（円の中央にあるもの）が周囲のタイプを「攻撃」します。ポインターは選択したタイプが周囲のタイプに与える影響を示します。",
    defenseButton: "防御モード：このモードでは、選択したタイプが周囲のタイプに「防御」します。ポインターは周囲のタイプが選択したポケモンにどのような影響を与えるかを示します。",
    pointerArrow: "矢印のポインターは「効果抜群」なダメージと攻撃の方向を示します。「+」は攻撃が4倍のダメージを与える可能性があることを示します。",
    pointerShield: "盾のアイコンは「いまひとつ」のダメージを示します。「+」は攻撃が1/4のダメージになる可能性があることを示します。",
    installTitle: "デバイスにインストール",
    iosInstructions: ["「共有」ボタンをタップ", "「ホーム画面に追加」をタップ", "「追加」をタップ"],
    androidInstructions: ["「共有」ボタンをタップ", "「ホーム画面に追加」をタップ", "「追加」をタップ"],
    whatElse: "他には？",
    disclaimer: "PokéTypeはファンアプリであり、任天堂、ゲームフリーク、またはポケモンカンパニーの製品ではありません。"
  },
  "es": {
    info: "Información",
    whatTitle: "¿Qué es esto?",
    whatMessage: "PokéType Matcher es una herramienta para visualizar cómo afectan los diferentes tipos de Pokémon entre sí.",
    howTitle: "¿Cómo se usa?",
    pokemonButton: "Selecciona un Pokémon para autocompletar los tipos.",
    typeButton: "Selecciona un Tipo Principal o Secundario. En el Modo Ataque, solo el tipo principal se usa para calcular el daño.",
    swapButton: "Intercambiar Tipos Principal y Secundario (No afecta en el Modo Defensa).",
    attackButton: "Modo Ataque: En este modo, el tipo seleccionado (el del centro del círculo) está atacando a los tipos a su alrededor. Los indicadores muestran cómo el tipo seleccionado afectaría a los demás.",
    defenseButton: "Modo Defensa: En este modo, el tipo o tipos seleccionados están defendiendo contra los tipos del círculo. Los indicadores muestran cómo los tipos alrededor afectarían a un Pokémon con los tipos seleccionados.",
    pointerArrow: "Las flechas indican daño 'Súper Eficaz' y la dirección del ataque. El '+' indica que un ataque podría hacer el cuádruple de daño.",
    pointerShield: "Los escudos indican daño 'Poco Eficaz'. El '+' indica que un ataque podría hacer solo una cuarta parte del daño.",
    installTitle: "Instalar en el dispositivo",
    iosInstructions: ["Toca el botón 'Compartir'", "Toca 'Añadir a la pantalla de inicio'", "Toca 'Añadir'"],
    androidInstructions: ["Toca el botón 'Compartir'", "Toca 'Añadir a la pantalla de inicio'", "Toca 'Añadir'"],
    whatElse: "¿Qué más?",
    disclaimer: "PokéType es una aplicación de fans y no es un producto de Nintendo, Game Freak ni The Pokémon Company."
  },
  "fr": {
    info: "Infos",
    whatTitle: "Qu'est-ce que c'est ?",
    whatMessage: "PokéType Matcher est un outil pour visualiser comment les différents types de Pokémon interagissent entre eux.",
    howTitle: "Comment l'utiliser ?",
    pokemonButton: "Sélectionnez un Pokémon pour remplir les types automatiquement.",
    typeButton: "Sélectionnez un Type Principal ou Secondaire. En Mode Attaque, seul le type principal est utilisé pour calculer les dégâts.",
    swapButton: "Échanger les Types Principal et Secondaire (Sans effet en Mode Défense).",
    attackButton: "Mode Attaque : Dans ce mode, le type sélectionné (au centre du cercle) attaque les types environnants. Les indicateurs montrent comment il affecte les autres.",
    defenseButton: "Mode Défense : Dans ce mode, les types sélectionnés se défendent contre les types autour du cercle. Les indicateurs montrent comment les types environnants affecteraient un Pokémon de ces types.",
    pointerArrow: "Les flèches indiquent les dégâts 'Super Efficace' et la direction de l'attaque. Le '+' signifie que l'attaque peut faire des dégâts quadruples.",
    pointerShield: "Les boucliers indiquent des dégâts 'Peu Efficace'. Le '+' signifie que l'attaque peut faire un quart des dégâts.",
    installTitle: "Installer sur l'appareil",
    iosInstructions: ["Appuyez sur le bouton 'Partager'", "Appuyez sur 'Ajouter à l'écran d'accueil'", "Appuyez sur 'Ajouter'"],
    androidInstructions: ["Appuyez sur le bouton 'Partager'", "Appuyez sur 'Ajouter à l'écran d'accueil'", "Appuyez sur 'Ajouter'"],
    whatElse: "Quoi d'autre ?",
    disclaimer: "PokéType est une application de fans et n'est pas un produit de Nintendo, Game Freak ou The Pokémon Company."
},
  "it": {
    info: "Informazioni",
    whatTitle: "Che cos'è?",
    whatMessage: "PokéType Matcher è uno strumento per visualizzare come i diversi tipi di Pokémon si influenzano tra loro.",
    howTitle: "Come si usa?",
    pokemonButton: "Seleziona un Pokémon per riempire automaticamente i tipi.",
    typeButton: "Seleziona un Tipo Principale o Secondario. In Modalità Attacco, solo il tipo principale viene usato per calcolare i danni.",
    swapButton: "Scambia Tipo Principale e Secondario (Nessun effetto in Modalità Difesa).",
    attackButton: "Modalità Attacco: In questa modalità, il tipo selezionato (quello al centro del cerchio) sta attaccando i tipi intorno. Gli indicatori mostrano come il tipo selezionato influenzerebbe gli altri.",
    defenseButton: "Modalità Difesa: In questa modalità, il tipo o i tipi selezionati si stanno difendendo dai tipi intorno al cerchio. Gli indicatori mostrano come i tipi circostanti influenzerebbero un Pokémon con i tipi selezionati.",
    pointerArrow: "Le frecce indicano danno 'Superefficace' e la direzione dell'attacco. Il '+' indica che un attacco potrebbe fare il quadruplo del danno.",
    pointerShield: "Gli scudi indicano danno 'Poco Efficace'. Il '+' indica che un attacco potrebbe fare solo un quarto del danno.",
    installTitle: "Installa sul dispositivo",
    iosInstructions: ["Tocca il pulsante 'Condividi'", "Tocca 'Aggiungi alla schermata Home'", "Tocca 'Aggiungi'"],
    androidInstructions: ["Tocca il pulsante 'Condividi'", "Tocca 'Aggiungi alla schermata Home'", "Tocca 'Aggiungi'"],
    whatElse: "Cos'altro?",
    disclaimer: "PokéType è un'app per fan e non è un prodotto di Nintendo, Game Freak o The Pokémon Company."
},
  "de": {
    info: "Info",
    whatTitle: "Was ist das?",
    whatMessage: "PokéType Matcher ist ein Tool zur Visualisierung, wie sich verschiedene Pokémon-Typen gegenseitig beeinflussen.",
    howTitle: "Wie benutzt man es?",
    pokemonButton: "Wähle ein Pokémon, um die Typen automatisch auszufüllen.",
    typeButton: "Wähle einen Haupt- oder Sekundärtyp. Im Angriffsmodus wird nur der Haupttyp zur Schadensberechnung verwendet.",
    swapButton: "Haupt- und Sekundärtyp tauschen (Keine Auswirkungen im Verteidigungsmodus).",
    attackButton: "Angriffsmodus: In diesem Modus greift der ausgewählte Typ (der sich in der Mitte des Kreises befindet) die umliegenden Typen an. Die Pfeile zeigen an, wie der gewählte Typ die anderen beeinflussen würde.",
    defenseButton: "Verteidigungsmodus: In diesem Modus verteidigt sich der gewählte Typ oder die gewählten Typen gegen die umgebenden Typen. Die Pfeile zeigen, wie die umliegenden Typen einen Pokémon dieses Typs beeinflussen würden.",
    pointerArrow: "Die Pfeile zeigen 'Sehr effektiv' Schaden und die Angriffsrichtung an. Das '+' bedeutet, dass ein Angriff vierfachen Schaden verursachen kann.",
    pointerShield: "Die Schilde zeigen 'Nicht sehr effektiv' Schaden an. Das '+' bedeutet, dass ein Angriff nur ein Viertel des Schadens verursachen kann.",
    installTitle: "Auf Gerät installieren",
    iosInstructions: ["Tippe auf die Schaltfläche 'Teilen'", "Tippe auf 'Zum Home-Bildschirm hinzufügen'", "Tippe auf 'Hinzufügen'"],
    androidInstructions: ["Tippe auf die Schaltfläche 'Teilen'", "Tippe auf 'Zum Home-Bildschirm hinzufügen'", "Tippe auf 'Hinzufügen'"],
    whatElse: "Was noch?",
    disclaimer: "PokéType ist eine Fan-App und kein Produkt von Nintendo, Game Freak oder The Pokémon Company."
},
  "ko": {
    info: "정보",
    whatTitle: "이게 뭐죠?",
    whatMessage: "포켓타입 매처는 다양한 포켓몬 타입이 서로 어떻게 영향을 주는지 시각적으로 보여주는 도구입니다.",
    howTitle: "어떻게 사용하나요?",
    pokemonButton: "포켓몬을 선택하여 타입을 자동으로 채웁니다.",
    typeButton: "메인 또는 보조 타입을 선택하세요. 공격 모드에서는 메인 타입만 피해량 계산에 사용됩니다.",
    swapButton: "메인과 보조 타입을 교체 (방어 모드에서는 영향을 주지 않습니다).",
    attackButton: "공격 모드: 이 모드에서는 선택한 타입(원 중앙에 위치한)이 주변 타입을 공격합니다. 화살표는 선택한 타입이 주변 타입에 미치는 영향을 나타냅니다.",
    defenseButton: "방어 모드: 이 모드에서는 선택한 타입(들)이 주변 타입을 방어합니다. 화살표는 주변 타입이 선택한 포켓몬 타입에 어떻게 영향을 주는지 나타냅니다.",
    pointerArrow: "화살표는 '효과가 굉장하다'는 피해와 공격 방향을 나타냅니다. '+'는 공격이 4배의 피해를 줄 수 있음을 의미합니다.",
    pointerShield: "방패 아이콘은 '효과가 별로다'는 피해를 나타냅니다. '+'는 공격이 1/4 피해를 줄 수 있음을 의미합니다.",
    installTitle: "디바이스에 설치",
    iosInstructions: ["'공유' 버튼을 누르세요", "'홈 화면에 추가'를 누르세요", "'추가'를 누르세요"],
    androidInstructions: ["'공유' 버튼을 누르세요", "'홈 화면에 추가'를 누르세요", "'추가'를 누르세요"],
    whatElse: "또 다른 정보는?",
    disclaimer: "PokéType는 팬 애플리케이션이며, 닌텐도, 게임프리크, 또는 포켓몬 컴퍼니의 제품이 아닙니다."
}
  
  
}
