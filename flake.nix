{
  description = "Entorno de desarrollo para Angular, Go y Turso";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Angular dependencies
            nodejs_22
            nodePackages.typescript
            nodePackages."@angular/cli"
            nodePackages.npm

            # Go dependencies
            go
            gopls          # Go language server
            go-tools      # Additional Go tools
            delve         # Go debugger

            # Turso CLI
            turso-cli
          ];

          shellHook = ''
            echo "🅰️ Entorno de Desarrollo Angular + Go + Turso"
            echo "Versiones:"
            echo "Angular:"
            node --version
            ng version
            npm --version
            echo "Go:"
            go version
            echo "Turso:"
            turso --version
            eval "$(ng completion script)"
          '';
        };
      }
    );
}
