import { z } from "zod";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  username: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),

  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zip is required"),
    geo: z.object({
      lat: z.string().optional(),
      lng: z.string().optional(),
    }),
  }),

  company: z.object({
    name: z.string().optional(),
    catchPhrase: z.string().optional(),
    bs: z.string().optional(),
  }),
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export type UserFormData = z.infer<typeof userSchema>;