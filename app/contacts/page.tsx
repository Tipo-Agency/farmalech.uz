"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { submitContactForm } from "./actions"
import { YandexMap } from "@/components/yandex-map"

export default function ContactsPage() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        setIsSubmitted(true)
        // Reset form after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-gray">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-brand-dark mb-4">
            {t("contacts.title")}
          </h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">{t("contacts.description")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-6">{t("contacts.info.title")}</h2>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-1">{t("contacts.info.address.title")}</h3>
                    <p className="text-muted-foreground">{t("contacts.info.address.value")}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-1">{t("contacts.info.phone.title")}</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+998990373300" className="hover:text-primary transition-colors">
                        +998 99 037 33 00
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-1">{t("contacts.info.email.title")}</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@farmalech.com" className="hover:text-primary transition-colors">
                        info@farmalech.com
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="mailto:sales@farmalech.com" className="hover:text-primary transition-colors">
                        sales@farmalech.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-1">{t("contacts.info.hours.title")}</h3>
                    <p className="text-muted-foreground">{t("contacts.info.hours.weekdays")}</p>
                    <p className="text-muted-foreground">{t("contacts.info.hours.weekend")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Yandex Map */}
            <Card>
              <CardContent className="p-0">
                <YandexMap />
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {t("contacts.form.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{t("contacts.form.success.title")}</h3>
                  <p className="text-muted-foreground">{t("contacts.form.success.message")}</p>
                </div>
              ) : (
                <form action={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("contacts.form.firstName")}</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder={t("contacts.form.firstName.placeholder")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("contacts.form.lastName")}</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder={t("contacts.form.lastName.placeholder")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contacts.form.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("contacts.form.email.placeholder")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contacts.form.phone")}</Label>
                    <Input id="phone" name="phone" type="tel" placeholder={t("contacts.form.phone.placeholder")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">{t("contacts.form.company")}</Label>
                    <Input id="company" name="company" placeholder={t("contacts.form.company.placeholder")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contacts.form.subject")}</Label>
                    <Input id="subject" name="subject" placeholder={t("contacts.form.subject.placeholder")} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contacts.form.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("contacts.form.message.placeholder")}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t("contacts.form.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {t("contacts.form.submit")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
