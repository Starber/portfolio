import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";

const colorTokens = [
  { name: "Background", token: "--background" },
  { name: "Foreground", token: "--foreground" },
  { name: "Orange", token: "--color-orange" },
  { name: "Orange Light", token: "--color-orange-light" },
  { name: "Navy", token: "--color-navy" },
  { name: "Navy Light", token: "--color-navy-light" },
  { name: "Blue", token: "--color-blue" },
  { name: "Purple", token: "--color-purple" },
  { name: "Yellow", token: "--color-yellow" },
  { name: "Muted", token: "--muted" },
];

export function StyleGuidePage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <section className="space-y-3">
          <Badge variant="secondary">Style Guide</Badge>
          <h1>Theme + Components</h1>
          <p className="max-w-3xl text-muted-foreground">
            This page demonstrates the current theme tokens, typography rules, utility classes, and reusable UI
            components in this project.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2>Color Tokens</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {colorTokens.map((item) => (
              <Card key={item.token}>
                <CardContent className="p-4 space-y-3">
                  <div
                    className="h-16 w-full rounded-lg border"
                    style={{ background: `var(${item.token})` }}
                    aria-label={`${item.name} swatch`}
                  />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.token}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Text Token Quick Reference</CardTitle>
              <CardDescription>Use these tokens intentionally for hierarchy and readability.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-lg border border-border bg-card/70 p-3">
                <p className="font-semibold text-body">text-body</p>
                <p className="mt-1 text-body">Default body paragraphs and longer general copy (Home-style text).</p>
              </div>
              <div className="rounded-lg border border-border bg-card/70 p-3">
                <p className="font-semibold text-accent-primary">text-accent-primary</p>
                <p className="mt-1 text-subtle">Primary highlights, key labels, short emphasis.</p>
              </div>
              <div className="rounded-lg border border-border bg-card/70 p-3">
                <p className="font-semibold text-accent-secondary">text-accent-secondary</p>
                <p className="mt-1 text-subtle">Paired states, informational accents, secondary highlights.</p>
              </div>
              <div className="rounded-lg border border-border bg-card/70 p-3">
                <p className="font-semibold text-accent-tertiary">text-accent-tertiary</p>
                <p className="mt-1 text-subtle">Supportive emphasis used sparingly.</p>
              </div>
              <div className="rounded-lg border border-border bg-card/70 p-3">
                <p className="font-semibold text-subtle">text-subtle</p>
                <p className="mt-1 text-subtle">Helper copy, metadata, longer supporting text.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2>Typography</h2>
          <Card>
            <CardContent className="p-6 space-y-3">
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
              <h5>Heading 5</h5>
              <h6>Heading 6</h6>
              <p>
                Paragraph text uses the base theme styles and line-height to keep content readable across desktop
                and mobile.
              </p>
              <p className="text-body">
                This is `text-body` (#9CA3AF), matching the paragraph-style copy used throughout the Home page.
              </p>

              <div className="mt-4 grid gap-2 rounded-xl border border-border bg-card/70 p-4 md:grid-cols-2">
                <p className="text-sm">
                  <span className="font-semibold text-accent-primary">Before:</span>{" "}
                  <span className="text-subtle">Legacy design with outdated visual hierarchy.</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-accent-secondary">After:</span>{" "}
                  <span className="text-subtle">Modernized UI with cleaner flow and clarity.</span>
                </p>
                <p className="text-sm md:col-span-2">
                  <span className="font-semibold text-accent-tertiary">Accent Usage:</span>{" "}
                  <span className="text-subtle">Use text accents to signal meaning, not just button states.</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2>Heading Color Usage</h2>
          <Card>
            <CardContent className="space-y-4 p-6">
              <p className="text-sm text-subtle">
                Industry best practice: keep headings mostly neutral, then accent one meaningful keyword or short phrase.
                This preserves readability and visual hierarchy.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card/70 p-4">
                  <p className="mb-2 text-xs uppercase tracking-wide text-subtle">Recommended</p>
                  <h3 className="leading-snug">
                    Build sites that <span className="text-accent-primary">convert</span>
                  </h3>
                  <p className="mt-2 text-sm text-subtle">
                    One accent keyword directs attention without overpowering the heading.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card/70 p-4">
                  <p className="mb-2 text-xs uppercase tracking-wide text-subtle">Also Good</p>
                  <h3 className="leading-snug">
                    Clear offers. Better <span className="text-accent-secondary">results</span>.
                  </h3>
                  <p className="mt-2 text-sm text-subtle">
                    Accent the outcome term to support meaning and hierarchy.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card/70 p-4 md:col-span-2">
                  <p className="mb-2 text-xs uppercase tracking-wide text-subtle">Avoid</p>
                  <h3 className="leading-snug text-subtle">
                    <span className="text-accent-primary">Too</span> <span className="text-accent-secondary">many</span>{" "}
                    <span className="text-accent-tertiary">colored</span> <span className="text-accent-primary">words</span>{" "}
                    in a heading
                  </h3>
                  <p className="mt-2 text-sm text-subtle">
                    Multiple accent colors in one heading reduce clarity and can feel decorative rather than purposeful.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2>Text Accent Rules (Do / Don&apos;t)</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-[var(--color-blue)]/35">
              <CardHeader>
                <CardTitle className="text-accent-secondary">Do</CardTitle>
                <CardDescription>Use color to communicate hierarchy and meaning.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold text-accent-primary">Primary accent</span>
                  <span className="text-subtle"> for key labels, short highlights, and callouts.</span>
                </p>
                <p>
                  <span className="font-semibold text-accent-secondary">Secondary accent</span>
                  <span className="text-subtle"> for paired states like Before/After and informational emphasis.</span>
                </p>
                <p>
                  <span className="font-semibold text-accent-tertiary">Tertiary accent</span>
                  <span className="text-subtle"> for supportive emphasis, never the dominant voice.</span>
                </p>
                <p className="text-subtle">Keep long-form body copy on foreground/subtle text for readability.</p>
              </CardContent>
            </Card>

            <Card className="border-[var(--destructive)]/35">
              <CardHeader>
                <CardTitle className="text-[var(--destructive)]">Don&apos;t</CardTitle>
                <CardDescription>Avoid color misuse that hurts clarity and accessibility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-subtle">
                <p>Don&apos;t color entire paragraphs with accent hues.</p>
                <p>Don&apos;t rely on color alone for important state changes.</p>
                <p>Don&apos;t use multiple accent colors in one short sentence.</p>
                <p>Don&apos;t make low-contrast accent text on textured/bright backgrounds.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2>Best-Practice Text Patterns</h2>
          <Card>
            <CardContent className="grid gap-4 p-6 md:grid-cols-2">
              <div className="space-y-2 rounded-xl border border-border bg-card/70 p-4">
                <p className="text-xs uppercase tracking-wide text-subtle">State label</p>
                <p className="text-sm">
                  <span className="font-semibold text-accent-primary">Before:</span>{" "}
                  <span className="text-subtle">Old and crusty navigation and weak hierarchy.</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-accent-secondary">After:</span>{" "}
                  <span className="text-subtle">Clear visual flow, improved contrast, stronger CTA placement.</span>
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-card/70 p-4">
                <p className="text-xs uppercase tracking-wide text-subtle">Metadata + helper text</p>
                <p className="text-sm text-card-foreground font-medium">Revision package · $300–$1,000</p>
                <p className="text-sm text-subtle">Most projects deliver in 1–2 weeks depending on scope.</p>
                <p className="text-sm">
                  <span className="font-medium text-accent-tertiary">Tip:</span>{" "}
                  <span className="text-subtle">Use one accent keyword, then return to neutral body text.</span>
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-card/70 p-4">
                <p className="text-xs uppercase tracking-wide text-subtle">Status messaging</p>
                <p className="text-sm">
                  <span className="font-semibold text-accent-secondary">Success:</span>{" "}
                  <span className="text-subtle">Message sent. We&apos;ll respond within one business day.</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[var(--destructive)]">Error:</span>{" "}
                  <span className="text-subtle">Couldn&apos;t send right now. Please try again.</span>
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-card/70 p-4">
                <p className="text-xs uppercase tracking-wide text-subtle">Inline emphasis</p>
                <p className="text-sm text-subtle">
                  Build trust with <span className="font-semibold text-accent-primary">specific outcomes</span>, not
                  decorative copy.
                </p>
                <p className="text-sm text-subtle">
                  Guide attention with <span className="font-semibold text-accent-secondary">one visual cue</span>
                  per sentence.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons + Badges</CardTitle>
              <CardDescription>Primary actions, secondary actions, and label styles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <Button className="btn-gradient text-white hover:text-white">Gradient (Home CTA)</Button>
                <Button className="border border-transparent bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-dark)]">
                  Default
                </Button>
                <Button
                  variant="secondary"
                  className="border border-transparent bg-[var(--color-blue)] text-white hover:opacity-90"
                >
                  Secondary
                </Button>
                <Button
                  variant="outline"
                  className="border-[var(--color-yellow)] bg-transparent text-[var(--color-yellow)] hover:bg-[var(--color-yellow)]/10"
                >
                  Outline
                </Button>
                <Button
                  variant="ghost"
                  className="text-[var(--foreground)] hover:bg-[var(--color-purple)]/15 hover:text-[var(--foreground)]"
                >
                  Ghost
                </Button>
                <Button variant="link" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)]">
                  Link
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-transparent bg-[var(--color-orange)] text-white">Default</Badge>
                <Badge variant="secondary" className="border-transparent bg-[var(--color-blue)] text-white">
                  Secondary
                </Badge>
                <Badge variant="outline" className="border-[var(--color-yellow)] text-[var(--color-yellow)]">
                  Outline
                </Badge>
                <Badge variant="destructive" className="border-transparent bg-[var(--destructive)] text-white">
                  Destructive
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback + Progress</CardTitle>
              <CardDescription>System messages and loading progress styles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-[var(--color-blue)]/50 bg-[var(--color-blue)]/12 text-[var(--foreground)]">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Project details were sent successfully.</AlertDescription>
              </Alert>
              <Alert
                variant="destructive"
                className="border-[var(--color-orange)]/60 bg-[var(--color-orange)]/18 text-[var(--foreground)]"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Unable to send at the moment. Try again shortly.</AlertDescription>
              </Alert>
              <div className="space-y-2">
                <p className="text-sm font-medium">Progress</p>
                <Progress
                  value={62}
                  className="bg-[var(--color-blue)]/20 [&_[data-slot=progress-indicator]]:bg-[var(--color-blue)]"
                />
                <Progress
                  value={38}
                  className="bg-[var(--color-purple)]/20 [&_[data-slot=progress-indicator]]:bg-[var(--color-purple)]"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
              <CardDescription>Inputs, selection controls, and toggles.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sg-name">Name</Label>
                <Input id="sg-name" placeholder="Jane Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sg-service">Service</Label>
                <Select defaultValue="revision">
                  <SelectTrigger id="sg-service">
                    <SelectValue placeholder="Pick a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-site">New Site</SelectItem>
                    <SelectItem value="revision">Site Revision</SelectItem>
                    <SelectItem value="management">Site Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="sg-message">Message</Label>
                <Textarea id="sg-message" placeholder="Describe your goals and timeline..." />
              </div>

              <div className="space-y-3">
                <Label htmlFor="sg-newsletter" className="gap-3">
                  <Checkbox id="sg-newsletter" defaultChecked />
                  Subscribe to updates
                </Label>
                <Label htmlFor="sg-updates" className="gap-3">
                  <Switch id="sg-updates" defaultChecked />
                  Enable maintenance updates
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <RadioGroup defaultValue="standard">
                  <Label htmlFor="sg-priority-standard" className="gap-3">
                    <RadioGroupItem id="sg-priority-standard" value="standard" />
                    Standard
                  </Label>
                  <Label htmlFor="sg-priority-rush" className="gap-3">
                    <RadioGroupItem id="sg-priority-rush" value="rush" />
                    Rush
                  </Label>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit Example</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cards + Avatars</CardTitle>
              <CardDescription>Profile-style content blocks using card surfaces.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <Avatar>
                  <AvatarImage src="/StarberLogoWhite.png" alt="Starber" />
                  <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Starber Studio</p>
                  <p className="text-sm text-muted-foreground">Modern websites for local businesses.</p>
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">
                  Cards inherit `bg-card`, `text-card-foreground`, and border tokens from theme variables.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tabs + Accordion</CardTitle>
              <CardDescription>Pattern library for grouped and collapsible content.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Tabs help switch between grouped data while keeping context on the same screen.
                  </p>
                </TabsContent>
                <TabsContent value="details" className="pt-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What does this section show?</AccordionTrigger>
                      <AccordionContent>
                        It demonstrates the default accordion animation, spacing, and typography.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Can tabs and accordion be combined?</AccordionTrigger>
                      <AccordionContent>Yes. This combination is useful for dense settings pages.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Table</CardTitle>
              <CardDescription>Data display style using the shared table primitives.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="overflow-hidden rounded-xl border border-border">
                <TableCaption>Example service pricing table.</TableCaption>
                <TableHeader className="bg-[var(--color-blue)]/12">
                  <TableRow className="border-b border-[var(--color-blue)]/30 hover:bg-transparent">
                    <TableHead className="text-accent-secondary">Service</TableHead>
                    <TableHead className="text-accent-secondary">Starting Price</TableHead>
                    <TableHead className="text-accent-secondary">Timeline</TableHead>
                    <TableHead className="text-accent-secondary">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-card/45 hover:bg-[var(--color-blue)]/10">
                    <TableCell className="font-medium text-card-foreground">New Site</TableCell>
                    <TableCell className="text-accent-primary font-medium">$1,000+</TableCell>
                    <TableCell className="text-subtle">2-4 weeks</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-[var(--color-purple)]/6 hover:bg-[var(--color-purple)]/14">
                    <TableCell className="font-medium text-card-foreground">Site Revision</TableCell>
                    <TableCell className="text-accent-secondary font-medium">$300-$1,000</TableCell>
                    <TableCell className="text-subtle">1-2 weeks</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Popular</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-card/45 hover:bg-[var(--color-yellow)]/10">
                    <TableCell className="font-medium text-card-foreground">Site Management</TableCell>
                    <TableCell className="text-accent-tertiary font-medium">$25/mo + fees</TableCell>
                    <TableCell className="text-subtle">Ongoing</TableCell>
                    <TableCell>
                      <Badge variant="outline">Support</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4 pb-8">
          <h2>Project Utility Classes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="toast-success rounded-xl border p-4">
              <p className="font-medium">toast-success</p>
              <p className="text-sm text-muted-foreground">Success toast background + border style from home.css.</p>
            </div>
            <div className="toast-error rounded-xl border p-4">
              <p className="font-medium">toast-error</p>
              <p className="text-sm text-muted-foreground">Error toast background + border style from home.css.</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border p-6">
            <div className="absolute inset-0 bg-radial-glow" aria-hidden="true" />
            <p className="relative z-10 text-sm text-muted-foreground">
              `bg-radial-glow` overlay utility applied on this container.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
