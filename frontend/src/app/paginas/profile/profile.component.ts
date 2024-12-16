import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { NgIf } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  updateSuccess = false;
  updateError = "";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.userForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
    });
  }

  ngOnInit() {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.userForm.patchValue({
        username: currentUser.username,
        email: currentUser.email,
      });
    }
  }

  onUpdateProfile() {
    if (this.userForm.valid && this.authService.currentUser()) {
      const userId = this.authService.currentUser()!.id;
      this.authService.updateUser(userId, this.userForm.value).subscribe({
        next: () => {
          this.updateSuccess = true;
          this.updateError = "";
          // Actualizar el usuario en el localStorage
          const updatedUser = {
            ...this.authService.currentUser()!,
            ...this.userForm.value,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          this.authService.currentUser.set(updatedUser);
        },
        error: (error) => {
          this.updateError = "Error al actualizar el perfil";
          this.updateSuccess = false;
        },
      });
    }
  }

  onUpdatePassword() {
    if (this.passwordForm.valid && this.authService.currentUser()) {
      const userId = this.authService.currentUser()!.id;
      this.authService
        .updateUser(userId, {
          password: this.passwordForm.value.newPassword,
        })
        .subscribe({
          next: () => {
            this.updateSuccess = true;
            this.updateError = "";
            this.passwordForm.reset();
          },
          error: (error) => {
            this.updateError = "Error al actualizar la contraseña";
            this.updateSuccess = false;
          },
        });
    }
  }

  onDeleteAccount() {
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
      )
    ) {
      const userId = this.authService.currentUser()!.id;
      this.authService.deleteUser(userId).subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.updateError = "Error al eliminar la cuenta";
        },
      });
    }
  }
}
