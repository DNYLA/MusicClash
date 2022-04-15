if (AutoSpawn isEqualTo true) then
    {
    while {!_hasSpawned} do {
		if (_hasSpawned) exitwith{};
		uisleep 1;
		switch (LastSpawn) do
		{
			case "gangversteck": { execVM "scripts\rdm_teleport\TP\gangversteckTP.sqf"; };
			case "tkreuzung": { execVM "scripts\rdm_teleport\TP\TkreuzungTP.sqf"; };
			case "ifrit": { execVM "scripts\rdm_teleport\TP\ChurchTP.sqf"; };
			case "qilinprowler": { execVM "scripts\rdm_teleport\TP\FedTP.sqf"; };
			case "Airport": { execVM "scripts\rdm_teleport\TP\AirportTP.sqf"; };
			case "ge": { execVM "scripts\rdm_teleport\TP\LabTP.sqf"; };
			case "pawnee": { execVM "scripts\rdm_teleport\TP\MushroomTP.sqf"; };
			case "city": { execVM "scripts\rdm_teleport\TP\ApdTP.sqf"; };
			case "ifrit2": { execVM "scripts\rdm_teleport\TP\IF2.sqf"; };
			case "smoke": { execVM "scripts\rdm_teleport\TP\SmokeTP.sqf"; };
			case "special": { execVM "scripts\rdm_teleport\TP\Special.sqf"; };
			case "og": { execVM "scripts\rdm_teleport\TP\ogArms.sqf"; };
			case "None": { player setPos PlayerSpawnPoint; };
			default { player setPos PlayerSpawnPoint; };
		};
	};
};